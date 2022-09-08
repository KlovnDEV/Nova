import { ParachuteState, Ped } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';

function canDive(ped: Ped) {
  return (
    (ped.isSprinting || ped.isRunning) &&
    ped.speed > 5 &&
    !ped.isInAnyVehicle(true) &&
    !ped.isFalling &&
    !ped.isDiving &&
    !ped.isInCover() &&
    !ped.isInParachuteFreeFall &&
    ped.parachuteState < ParachuteState.OPENING
  );
}

export async function pedDive(ped: Ped): Promise<boolean> {
  if (!canDive(ped)) return false;

  ped.tasks.clear(true);

  await ped.tasks.playAnim({
    animDictionary: 'move_jump',
    animationName: 'dive_start_run',
    blendOutSpeed: 1.0,
  });

  await Delay(1200);

  SetPedToRagdoll(ped.handle, 1000, 1000, 0, false, false, false);
  return true;
}
