import { AnyObject, CallbackArgsType, ServerCallbackFunction } from '@nova/engine-lib/shared';
import { Static } from '@nova/engine-lib/shared/Core';

export class ServerCallback extends Static {
  private static GLOBAL_ID = 0;
  static ServerCallbacks = {};

  static async Trigger(name: string, ...args: CallbackArgsType): Promise<any> {
    const cid = ServerCallback.GLOBAL_ID;
    ServerCallback.GLOBAL_ID += 1;
    if (ServerCallback.GLOBAL_ID > 65535) ServerCallback.GLOBAL_ID = 1;

    emitNet(`engine:triggerServerCallback`, cid, name, ...args);

    let promiseResolve;
    let promiseReject;

    const promise = new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    ServerCallback.ServerCallbacks[cid] = [promiseResolve, promiseReject];

    return promise;
  }
}

on(`engine:triggerServerCallback`, async (cb: ServerCallbackFunction, name: string, ...args: CallbackArgsType) => {
  ServerCallback.Trigger(name, ...args).then(cb);
});

onNet(`engine:triggerServerCallbackResult`, (cid: number, result: AnyObject) => {
  if (ServerCallback.ServerCallbacks[cid]) {
    ServerCallback.ServerCallbacks[cid][0](result);
    delete ServerCallback.ServerCallbacks[cid];
  }
});
