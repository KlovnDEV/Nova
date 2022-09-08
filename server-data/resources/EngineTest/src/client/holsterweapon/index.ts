/* Готово и работает */
/* eslint-disable no-bitwise */
import { LocalPlayer, ParachuteState, Ped } from '@nova/engine-lib/client/Game';
import { Weapon } from '@nova/engine-lib/client/Game/PedWeapon';
import { Control, Controls } from '@nova/engine-lib/client/Input';
import Config from '../../config/holsterweapon';
import { holsterCivil, holsterPolice, unholsterCivil, unholsterPolice } from './anims';

let holstered = true;
let blockKeys = false;

const allowedWeapons = new Set<number>();

Config.Weapons.forEach(weapon => {
  allowedWeapons.add(GetHashKey(weapon));
});

function CheckWeapon(ped: Ped) {
  return allowedWeapons.has(ped.weapon.selected);
}

// setTick(async () => {
//   loadAnimDict('rcmjosh4');
//   loadAnimDict('reaction@intimidation@cop@unarmed');
//   loadAnimDict('reaction@intimidation@1h');
//   await Delay(60000);
// });

setTick(async () => {
  const { ped } = LocalPlayer;
  const isPolice = !!LocalPlayer.roles.police;
  const isOnParachute = ped.parachuteState > ParachuteState.WEAR;

  // если садимся в машину, кладём оружие в кобуру
  if (ped.isInAnyVehicle(true) || isOnParachute) {
    holstered = true;

    if (ped.getVehiclePedIsTryingToEnter()) {
      ped.weapon.setCurrent(Weapon.UNARMED);
    }

    return;
  }

  // если умерли, сбрасываем анимацию
  if (ped.isDead && !holstered) {
    blockKeys = false;
    holstered = true;
    ped.tasks.clear();
  }

  const isAllowedWeapon = CheckWeapon(ped);

  // достаём пистолет из кобуры
  if (isAllowedWeapon && holstered) {
    blockKeys = true;
    if (isPolice) await unholsterPolice(ped);
    else await unholsterCivil(ped);
    blockKeys = false;
    holstered = false;
  }

  // прячем пистолет в кобуру
  if (!isAllowedWeapon && !holstered) {
    if (isPolice) await holsterPolice(ped);
    else await holsterCivil(ped);
    holstered = true;
  }
});

setTick(() => {
  if (blockKeys) {
    Control.Disable(Controls.AIM);
    Control.Disable(Controls.MELEE_ATTACK_LIGHT);
    Control.Disable(Controls.MELEE_ATTACK_HEAVY);
    Control.Disable(Controls.MELEE_ATTACK_ALTERNATE);
    Control.Disable(Controls.ENTER);
    Control.Disable(Controls.SELECT_WEAPON); // TAB

    LocalPlayer.disableFiringThisFrame();
  }
});
