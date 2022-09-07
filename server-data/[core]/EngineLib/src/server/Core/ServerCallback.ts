import { Player } from '../Game/Player';
import { Static } from '../../shared/Core/Static';
import { ServerCallbackFunction, CallbackArgsType, AnyObject } from '../../shared/types';

export class ServerCallback extends Static {
  static async Trigger(player: Player, name: string, ...args: CallbackArgsType): Promise<AnyObject> {
    let promiseResolve;

    const promise = new Promise(resolve => {
      promiseResolve = resolve;
    });

    emit(`engine:triggerServerCallback`, player.handle, promiseResolve, name, ...args);

    return promise;
  }

  static Register(name: string, callback: ServerCallbackFunction): void {
    TriggerEvent('engine:registerServerCallback', name, callback);
  }
}
