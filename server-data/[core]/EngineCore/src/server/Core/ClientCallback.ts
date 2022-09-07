import { AnyObject, assert, CallbackArgsType, Static } from '@nova/engine-lib/shared';
import { Player, Players } from '@nova/engine-lib/server/Game';

export class ClientCallback extends Static {
  static ClientCallbacks = {};
  static GLOBAL_ID = 0;

  static async Trigger(player: Player, name: string, ...args: CallbackArgsType): Promise<AnyObject> {
    console.debug('^3Server triggering client callback: ', player.name, name, args);
    const cid = ClientCallback.GLOBAL_ID;
    ClientCallback.GLOBAL_ID += 1;
    if (ClientCallback.GLOBAL_ID > 65535) ClientCallback.GLOBAL_ID = 1;

    emitNet(`engine:triggerClientCallback`, player.handle, cid, name, ...args);

    let promiseResolve;
    let promiseReject;

    const promise = new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    if (!ClientCallback.ClientCallbacks[player.handle]) {
      ClientCallback.ClientCallbacks[player.handle] = {};
    }

    ClientCallback.ClientCallbacks[player.handle][cid] = [promiseResolve, promiseReject];

    return promise;
  }
}

on(
  'engine:triggerClientCallback',
  (handle: Player['handle'], cb: (value: AnyObject) => AnyObject, name: string, ...args: CallbackArgsType) => {
    const player = Players.ByHandle(String(handle));
    if (!player) throw new Error(`Client callback ${name} player not found! Player: ${handle}`);
    ClientCallback.Trigger(player, name, ...args).then(cb);
  },
);

onNet(`engine:triggerClientCallbackResult`, (cid: number, ...args: CallbackArgsType) => {
  const player = Players.ByHandle(String(source));
  assert(player);

  console.debug('^3Server got client callback result: ', cid, player.name, args);

  if (!ClientCallback.ClientCallbacks[player.handle][cid]) {
    throw new Error(`Client callback ${cid} not found! Player: ${player.identifier}`);
  }

  ClientCallback.ClientCallbacks[player.handle][cid][0](...args);
  delete ClientCallback.ClientCallbacks[player.handle][cid];
});
