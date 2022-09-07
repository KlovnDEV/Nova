import { AnyObject, assert, CallbackArgsType, ServerCallbackFunction, Static } from '@nova/engine-lib/shared';
import { Player, Players } from '@nova/engine-lib/server/Game';

export class ServerCallback extends Static {
  static ServerCallbacks: Record<string, ServerCallbackFunction> = {};
  static GLOBAL_ID = 0;

  static Register(name: string, callback: ServerCallbackFunction): void {
    ServerCallback.ServerCallbacks[name] = callback;
    console.info(`^3Server callback registered: ${name}`);
  }

  static async Trigger(player: Player, name: string, ...args: CallbackArgsType): Promise<AnyObject> {
    if (!ServerCallback.ServerCallbacks[name])
      throw new Error(`Server callback with name ${name} not found! Sender: ${player.name}`);

    return Promise.resolve(ServerCallback.ServerCallbacks[name](player.handle, ...args));
  }
}

on(
  'engine:triggerServerCallback',
  (handle: Player['handle'], cb: (value: AnyObject) => AnyObject, name: string, ...args: CallbackArgsType) => {
    const player = Players.ByHandle(String(handle));
    ServerCallback.Trigger(player, name, ...args).then(cb);
  },
);

onNet(`engine:triggerServerCallback`, async (cid: number, name: string, ...args: CallbackArgsType) => {
  const player = Players.ByHandle(source);
  assert(player);

  if (!ServerCallback.ServerCallbacks[name]) {
    throw new Error(`Server callback ${name} not found! Player: ${player.identifier}`);
  }

  const result = ServerCallback.ServerCallbacks[name](player.handle, ...args);

  emitNet(`engine:triggerServerCallbackResult`, player.handle, cid, result);
});

on('engine:registerServerCallback', (name: string, callback: ServerCallbackFunction) => {
  ServerCallback.Register(name, callback);
});
