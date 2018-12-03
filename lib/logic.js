'use strict';

/**
 * Change the owner
 * @param {org.example.mynetwork.ChangeOwner} ChangeOwner
 * @transaction
 */
async function ChangeOwner(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.example.mynetwork.ChangeOwner');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified mit an event for the modified asset.
    let event = getFactory().newEvent('org.example.mynetwork', 'PhoneExhange');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}
/**
 * Change the status of the phone
 * @param {org.example.mynetwork.markAsStolen} markAsStolen
 * @transaction
 */
async function markAsStolen(tx){
    const oldStatus = tx.asset.value;
    tx.asset.value = tx.newStatus;

    const assetRegistry = await getAssetRegistry('org.example.mynetwork.markAsStolen');
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('org.example.mynetwork', 'stolen');
    event.asset = tx.asset;
    event.oldStatus = oldStatus;
    event.newStatus = tx.newStatus;
    emit(event);
}