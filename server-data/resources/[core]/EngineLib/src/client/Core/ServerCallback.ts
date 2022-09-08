import { Static } from '../../shared/Core/Static';
import { CallbackArgsType, AnyObject } from '../../shared/types';
export class ServerCallback extends Static {
  static async Trigger(name: string, ...args: CallbackArgsType): Promise<AnyObject> {
    let promiseResolve;

    const promise = new Promise(resolve => {
      promiseResolve = resolve;
    });

    emit('engine:triggerServerCallback', promiseResolve, name, ...args);

    return promise;
  }
}
