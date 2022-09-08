import { LocalPlayer, Ped } from '@nova/engine-lib/client/Game';
import { loadAnimSet } from '@nova/engine-lib/client/Utils';

function getGait() {
  return LocalPlayer.state.gait || 'MOVE_M@TOUGH_GUY@';
}

export async function resetGait(ped: Ped): Promise<void> {
  const { handle } = ped;
  const gait = getGait();
  await loadAnimSet(gait);

  ResetPedMovementClipset(handle, 0.0);
  ResetPedStrafeClipset(handle);
  SetPedMovementClipset(handle, gait, 0.5);
}

export async function setCrouchedGait(ped: Ped): Promise<void> {
  await loadAnimSet('move_ped_crouched');

  ResetPedMovementClipset(ped.handle, 0.0);
  ResetPedStrafeClipset(ped.handle);
  SetPedMovementClipset(ped.handle, 'move_ped_crouched', 0.55);
  SetPedStrafeClipset(ped.handle, 'move_ped_crouched_strafing');
}
