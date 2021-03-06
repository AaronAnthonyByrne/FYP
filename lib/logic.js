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
}
/**
 * Change the status of the phone
 * @param {org.example.mynetwork.markAsStolen} markAsStolen
 * @transaction
 */
async function markAsStolen(tx){
  //get the old status and new status from the transaction
    const oldStatus = tx.phone.phoneStatus;
    const newStatus = "STOLEN";

    // Update the asset with the new value.
    tx.phone.phoneStatus = newStatus;

    //get the assest registry to update the phones status
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.Phone');
    console.log("assest Registry is :"+assetRegistry);
    await assetRegistry.update(tx.phone);
  
    // let event = getFactory().newEvent('org.example.mynetwork', 'stolen');
    // event.asset = tx.asset;
    // event.oldStatus = oldStatus;
    // event.newStatus = tx.newStatus;
    // emit(event);
}
