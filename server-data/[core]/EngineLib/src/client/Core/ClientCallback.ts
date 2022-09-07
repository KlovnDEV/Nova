import { Static } from '../../shared/Core/Static';
import { ClientCallbackFunction, CallbackArgsType, AnyObject } from '../../shared/types';

export class ClientCallback extends Static {
  static async Trigger(name: string, ...args: CallbackArgsType): Promise<AnyObject> {
    let promiseResolve;

    const promise = new Promise(resolve => {
      promiseResolve = resolve;
    });

    emit('engine:triggerClientCallback', promiseResolve, name, ...args);

    return promise;
  }

  static Register(name: string, callback: ClientCallbackFunction): void {
    emit('engine:registerClientCallback', name, callback);
  }
}
