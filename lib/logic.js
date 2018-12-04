'use strict';

/**
 * Change the owner
 * @param {org.example.mynetwork.ChangeOwner} ChangeOwner
 * @transaction
 */
async function ChangeOwner(tx) {
    // Save the old value of the asset.
    const oldOwner = tx.phone.owner.ownerId;
  	const newOwner = tx.newOwner;
  
    // Update the asset with the new value.
    tx.phone.owner = newOwner;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Phone');
  	console.log("assest Registry is :"+assetRegistry);
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.phone);
  	console.log("after await for "+tx.phone); 
  
/*
    // Emit an event for the modified mit an event for the modified asset.
    let event = getFactory().newEvent('org.example.mynetwork', 'PhoneExhange');
  	console.log(event);
  	event.phone = tx.phone;
  	
    event.oldPhoneOwner = oldOwner;
    event.newPhoneOwner = newOwner;
    emit(event);
*/
}
/**
 * Change the status of the phone
 * @param {org.example.mynetwork.markAsStolen} markAsStolen
 * @transaction
async function markAsStolen(tx){
    const oldStatus = tx.asset.value;
    tx.asset.value = tx.newStatus;

    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Phone');
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('org.example.mynetwork', 'stolen');
    event.asset = tx.asset;
    event.oldStatus = oldStatus;
    event.newStatus = tx.newStatus;
    emit(event);
}*/
