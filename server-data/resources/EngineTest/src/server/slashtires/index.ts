import { Inventory } from '@nova/engine-lib/server/Inventory';
import { Players } from '@nova/engine-lib/server/Game';

onNet('slashtires:TargetClient', function (client, tireIndex) {
  emitNet('slashtires:SlashClientTire', client, tireIndex);
});

onNet('slashtires:slash', function (pos, model, tireIndex) {
  TriggerClientEvent('slashtires:slash', -1, pos, model, tireIndex);
});

onNet('slashtires:repair', function (pos, model, tireIndex) {
  const player = Players.ByHandle(source);
  const inv = Inventory.ByPlayerIdentifier(player.identifier);

  const tires = Object.values(inv.search({ name: 'tire' }, true));

  if (tires.length && tires[0].remove(1)) {
    TriggerClientEvent('slashtires:repair', -1, pos, model, tireIndex);
  }
});
