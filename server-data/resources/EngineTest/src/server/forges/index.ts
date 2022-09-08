import { ESX, ESXInit } from '@nova/engine-lib/server/Core';
import Config from '../../config/forges';

(async () => {
  await ESXInit();

  Config.Zones.forEach(zone => {
    ESX.Custom.Inventory.Create('craft', zone.identifier, false, {
      title: zone.title ?? 'Контейнер',
      maxWeight: 1000,
      actionGroup: 'container',
      width: zone.width ?? 30,
      height: zone.height ?? 20,
    });
  });
})();
