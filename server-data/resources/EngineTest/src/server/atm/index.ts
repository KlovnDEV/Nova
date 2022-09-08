import { Players } from '@nova/engine-lib/server/Game';
import { Inventory, InventoryItem } from '@nova/engine-lib/server/Inventory';
import { showNotification } from '@nova/engine-lib/server/UI';
import { assert, Log } from '@nova/engine-lib/shared';

onNet('atm:deposit', function (amount) {
  assert(amount);

  const player = Players.ByHandle(source);
  player.money
    .pay(['cash'], amount, 'Зачисление на банковский счёт')
    .then(() => {
      player.money.add('bank', amount, 'Зачисление на банковский счёт');
    })
    .catch(() => {
      showNotification(player, 'Недостаточно наличных!');
    });

  emitNet('nova-ui:updateBank', player.handle);
});

onNet('atm:withdraw', function (amount) {
  assert(amount);
  const player = Players.ByHandle(source);

  player.money
    .pay(['bank'], amount, 'Выдача наличных')
    .then(() => {
      const inv = Inventory.ByPlayerIdentifier(player.identifier);
      const item = inv.addItem(InventoryItem.Create('cash'), amount, false, true);
      if (!item) {
        player.money.add('bank', amount, 'Компенсация при невозможности выдачи');
      }
    })
    .catch(() => {
      showNotification(player, 'Недостаточно средств на счёте!');
    });

  emitNet('nova-ui:updateBank', player.handle);
});
