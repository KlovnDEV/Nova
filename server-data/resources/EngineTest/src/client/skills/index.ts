import { LocalPlayer, PedConfigFlag } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';

setTick(async () => {
  await Delay(100);
  const { handle } = LocalPlayer;
  const hungerHigh = LocalPlayer.status['hunger-high'] > 1.0;
  const hungerLow = LocalPlayer.status['hunger-Low'] > 1.0;
  const overeating = LocalPlayer.status.overeating > 1.0;

  let endurance = LocalPlayer.status.endurance * 0.01;
  let agility = LocalPlayer.status.agility * 0.01;
  const strength = LocalPlayer.status.strength * 0.01;

  if (hungerLow) {
    endurance *= 0.5;
  }

  if (hungerHigh || overeating) {
    endurance *= 0.5;
    agility *= 0.5;
  }

  RestorePlayerStamina(handle, 0.007 * endurance);
  SetPlayerMeleeWeaponDefenseModifier(handle, 1.0 - endurance * 0.2 - strength * 0.2);

  const agilityBonus = 0.4 * agility;
  SetRunSprintMultiplierForPlayer(handle, 1.0 + agilityBonus);
  SetSwimMultiplierForPlayer(handle, 1.0 + agilityBonus);

  const strengthBonus = 10.0; // (0.2 / 100) * LocalPlayer.status.strength;
  //   SetPlayerMeleeWeaponDamageModifier(handle, 1.0 + strengthBonus);

});

setTick(async () => {
  await Delay(1000);
  if (LocalPlayer.status['hunger-high'] > 99.0 || LocalPlayer.status['thirst'] > 99.0) {
    LocalPlayer.ped.health -= 1.0;
  }
});
// Перк плохой пловец
// setTick(async () => {
//   if (IsPedSwimming(LocalPlayer.ped.handle)) {
//     Control.Disable(Controls.SPRINT);
//   }
// });
