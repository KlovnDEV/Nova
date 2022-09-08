import { Player } from '../Game/Player';
import { Static } from '../../shared/Core/Static';
import { CallbackArgsType, AnyObject } from '../../shared/types';

export class ClientCallback extends Static {
  static async Trigger(player: Player, name: string, ...args: CallbackArgsType): Promise<AnyObject> {
    let promiseResolve;

    const promise = new Promise(resolve => {
      promiseResolve = resolve;
    });

    emit(`engine:triggerClientCallback`, player.handle, promiseResolve, name, ...args);

    return promise;
  }
}
