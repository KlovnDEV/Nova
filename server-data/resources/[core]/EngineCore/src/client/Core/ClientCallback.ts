import { CallbackArgsType, ClientCallbackFunction } from '@nova/engine-lib/shared';
import { Static } from '@nova/engine-lib/shared/Core';

export class ClientCallback extends Static {
  static ClientCallbacks = {};

  static Register(name: string, callback: ClientCallbackFunction): void {
    ClientCallback.ClientCallbacks[name] = callback;
    console.info(`^3Client callback registered: ${name}`);
  }

  static async Trigger(name: string, ...args: CallbackArgsType): Promise<any> {
    console.debug('^3Client triggered client callback: ', name, args);
    if (!ClientCallback.ClientCallbacks[name]) throw new Error(`Client callback with name ${name} not found!`);

    const ret = ClientCallback.ClientCallbacks[name](...args);

    return Promise.resolve(ret);
  }
}

onNet(`engine:triggerClientCallback`, async (cid: number, name: string, ...args: CallbackArgsType) => {
  console.debug('^3Client retrieved client callback: ', cid, name, args);

  ClientCallback.Trigger(name, ...args).then(result => {
    console.debug('^3Client sending client callback result: ', result);
    emitNet(`engine:triggerClientCallbackResult`, cid, result);
  });
});

on(`engine:registerClientCallback`, (name: string, callback: ClientCallbackFunction) => {
  ClientCallback.Register(name, callback);
});
