import { Core } from '@nova/engine-lib/server';
import { ESXInit, ServerCallback } from '@nova/engine-lib/server/Core';

let ESX = null;
ESXInit().then(instance => {
  ESX = instance;
});

function registerTrunk(uid, plate) {
  let disposable = false;

  if (uid == 0) {
    uid = plate;
    disposable = true;
  }

  const inv = ESX.Custom.Inventory.Create('car', uid, false, {
    title: 'Багажник',
    maxWeight: 5000,
    actionGroup: 'container',
    disposable: disposable,
    width: 25,
    height: 15,
  });

  return inv;
}

ServerCallback.Register('trunks:registerTrunk', (playerHandle: number, uid: number, plate: string) => {
  return registerTrunk(uid, plate);
});
