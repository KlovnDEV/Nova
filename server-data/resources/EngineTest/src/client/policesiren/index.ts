import { LocalPlayer, Ped, Player, Players, Vehicle } from '@nova/engine-lib/client/Game';
import { Decor, DecorType } from '@nova/engine-lib/client/Game/Decor';
import { Control } from '@nova/engine-lib/client/Input';

import Config from '../../config/policesiren';

Decor.register(Config.SIRENSOUND_PNAME, DecorType.BOOL);
Decor.register(Config.BLIPSIREN_PNAME, DecorType.BOOL);
Decor.register(Config.SILENTSIREN_PNAME, DecorType.BOOL);

let hotkeyTimeout = 0;

function IsDecorActive(car: Vehicle, decor: string) {
  if (!car.decor.exist(decor)) {
    return false;
  }
  return car.decor.getBool(decor);
}

function CheckForSirens() {
  Players.All().forEach((player: Player) => {
    const playerPed: Ped = player.ped;
    const playerCar: Vehicle = playerPed.vehicle;

    if (playerPed && playerCar) {
      if (IsDecorActive(playerCar, Config.BLIPSIREN_PNAME)) {
        BlipSiren(playerCar.handle);
      }

      if (IsDecorActive(playerCar, Config.SIRENSOUND_PNAME)) {
        StartVehicleHorn(playerCar.handle, 1, 'HELDDOWN', false);
      }

      playerCar.hasMutedSirens = IsDecorActive(playerCar, Config.SILENTSIREN_PNAME);
    }
  });
}

setTick(async () => {
  const playerPed = LocalPlayer.ped;
  const playerCar = playerPed.vehicle;

  if (playerCar.exist) {
    if (Control.Pressed(Config.SILENTSIREN_HOTKEY)) {
      hotkeyTimeout += 1;
      if (hotkeyTimeout > Config.SILENTHOTKEY_MAXTIMEOUT) {
        playerCar.decor.setBool(Config.BLIPSIREN_PNAME, true);
      }
    } else {
      if (hotkeyTimeout > 0 && hotkeyTimeout < Config.SILENTHOTKEY_MAXTIMEOUT) {
        playerCar.decor.setBool(Config.SILENTSIREN_PNAME, !IsDecorActive(playerCar, Config.SILENTSIREN_PNAME));
      }

      playerCar.decor.setBool(Config.BLIPSIREN_PNAME, false);
      hotkeyTimeout = 0;
    }

    if (playerCar.isSirenOn && !IsDecorActive(playerCar, Config.SILENTSIREN_PNAME)) {
      if (Control.JustPressed(Config.SIRENSOUND_HOTKEY)) {
        playerCar.decor.setBool(Config.SIRENSOUND_PNAME, !IsDecorActive(playerCar, Config.SIRENSOUND_PNAME));
      }
    } else {
      playerCar.decor.setBool(Config.SIRENSOUND_PNAME, false);
    }
  }

  CheckForSirens();
});
