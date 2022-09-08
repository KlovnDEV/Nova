import { assert } from '@nova/engine-lib/shared';
import { Players } from '@nova/engine-lib/server/Game';
import { showNotification } from '@nova/engine-lib/server/UI';
import { Inventory, InventoryItem } from '@nova/engine-lib/server/Inventory';
import Config from '../../config/itemmarkers';

onNet('itemmarkers:giveitem', async id => {
  const zone = Config.Zones[id];
  const player = Players.ByHandle(source);
  assert(zone);

  const ItemInfo = zone.Item;

  if (zone.Cooldown && zone.Cooldown > 0) {
    showNotification(player, `Слишком рано! Ожидайте ${zone.Cooldown} сек.`);
    return;
  }

  const inv = Inventory.ByPlayerIdentifier(player.identifier);
  await inv.update();

  const item = InventoryItem.Create(ItemInfo.name);
  if (item && inv.addItem(item, ItemInfo.amount, true, true)) {
    showNotification(player, 'Предмет добавлен');
    zone.Cooldown = zone.Interval;
  } else {
    showNotification(player, `Невозможно добавить предмет ${ItemInfo.name}`);
  }
});
