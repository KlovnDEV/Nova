import { showNotification } from '@nova/engine-lib/server/UI';
import { Player, Players } from '@nova/engine-lib/server/Game';
import { Log } from '@nova/engine-lib/shared';
import { Command } from '@nova/engine-lib/server/Admin';

export class Blackout {
  private static _enabled = false;

  static get enabled() {
    return this._enabled;
  }

  static set enabled(value: boolean) {
    this._enabled = value;
    TriggerEvent('weather:requestSync');
  }
}

function doBlackout(player: Player) {
  Blackout.enabled = !Blackout.enabled;

  if (!player) {
    Log.info(`Blackout is now ${Blackout.enabled ? 'enabled' : 'disabled'}.`);
  } else {
    showNotification(player, `Blackout is now ${Blackout.enabled ? '~b~enabled' : '~r~disabled'}~s~.`);
  }
}

onNet('weather:blackout', function () {
  const player = Players.ByHandle(source);
  doBlackout(player);
});

new Command('blackout', ['admin'], (player: Player) => {
  doBlackout(player);
})
  .setSuggestion({ help: 'Включить блэкаут' })
  .register();
