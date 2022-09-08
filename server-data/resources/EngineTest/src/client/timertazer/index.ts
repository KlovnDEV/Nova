import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';

let isTaz = false;

setTick(async () => {
  const { ped } = LocalPlayer;
  const stunned = ped.isStunned;

  if (stunned) {
    SetPedToRagdoll(ped.handle, 5000, 5000, 0, false, false, false);
  }

  if (stunned && !isTaz) {
    isTaz = true;
    SetTimecycleModifier('REDMIST_blend');
    ShakeGameplayCam('FAMILY5_DRUG_TRIP_SHAKE', 1.0);
  }

  if (!stunned && isTaz) {
    isTaz = false;
    await Delay(5000);
    SetTimecycleModifier('hud_def_desat_Trevor');
    await Delay(10000);
    SetTimecycleModifier('');
    SetTransitionTimecycleModifier('', 0);
    StopGameplayCamShaking(false);
  }
});
