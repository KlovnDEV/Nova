import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Control, Controls, Keys } from '@nova/engine-lib/client/Input';

let ragdolled = false;

setTick(async () => {
  const { ped } = LocalPlayer;

  if (Control.JustReleased(Controls.VEH_HEADLIGHT)) {
    ragdolled = !ragdolled;
  }

  if (ragdolled) {
    if (Control.JustReleased(Keys.X)) {
      ragdolled = false;
    } else if (IsPedRunningRagdollTask(ped.handle)) {
      ResetPedRagdollTimer(ped.handle);
    } else {
      SetPedToRagdoll(ped.handle, 100, 100, 0, false, false, false);
    }
  }
});
