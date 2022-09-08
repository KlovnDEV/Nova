/* eslint-disable no-bitwise */
import { AnimationFlags, LocalPlayer } from '@nova/engine-lib/client/Game';
import { Control, Keys } from '@nova/engine-lib/client/Input';
import { loadAnimDict } from '@nova/engine-lib/client/Utils';
import { Delay } from '@nova/engine-lib/shared';

let canHandsUp = true;
let handsup = false;

setTick(async () => {
  if (handsup && LocalPlayer.ped.isInAir) {
    handsup = false;
    LocalPlayer.ped.tasks.clearSecondary();
  }

  if (canHandsUp) {
    if (Control.JustReleased(Keys.F2)) {
      const playerPed = LocalPlayer.ped;

      await loadAnimDict('random@mugging3');

      if (handsup) {
        handsup = false;
        playerPed.tasks.clearSecondary();
        // TriggerServerEvent('esx_thief:update', handsup);
        await Delay(500);
      } else {
        handsup = true;
        playerPed.tasks.playAnim({
          animDictionary: 'random@mugging3',
          animationName: 'handsup_standing_base',
          flags: AnimationFlags.REPEAT | AnimationFlags.UPPERBODY | AnimationFlags.ENABLE_PLAYER_CONTROL,
        });

        // TriggerServerEvent('esx_thief:update', handsup);
        await Delay(500);
      }
    }
  }
});

onNet('handsup:toggle', param => {
  canHandsUp = param;
});
