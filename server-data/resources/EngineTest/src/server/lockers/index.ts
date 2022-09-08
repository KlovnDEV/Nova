import { Core } from '@nova/engine-lib/server';
import { ESX, ESXInit } from '@nova/engine-lib/server/Core';
import Config from '../../config/lockers';

(async () => {
  await ESXInit();

  Config.Zones.forEach(zone => {
    ESX.Custom.Inventory.Create(zone.category, zone.identifier, false, {
      title: zone.title ?? 'Контейнер',
      maxWeight: zone.maxWeight ?? 30,
      actionGroup: 'container',
      width: zone.width ?? 15,
      height: zone.height ?? 20,
    });
  });
})();
