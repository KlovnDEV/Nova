/* eslint-disable no-bitwise */
import { LocalPlayer, PedConfigFlag } from '@nova/engine-lib/client/Game';
import { Control } from '@nova/engine-lib/client/Input';
import { loadAnimDict } from '@nova/engine-lib/client/Utils';
import { clamp, Delay } from '@nova/engine-lib/shared';

let mpPointing = false;

async function startPointing() {
  const { handle } = LocalPlayer.ped;
  mpPointing = true;

  await loadAnimDict('anim@mp_point');

  SetPedCurrentWeaponVisible(handle, false, true, true, true);
  LocalPlayer.ped.setConfigFlag(36, true);
  TaskMoveNetwork(handle, 'task_mp_pointing', 0.5, false, 'anim@mp_point', 24);
  RemoveAnimDict('anim@mp_point');
}

function stopPointing() {
  const { ped } = LocalPlayer;
  RequestTaskMoveNetworkStateTransition(ped.handle, 'Stop');

  if (!ped.injured) {
    ped.tasks.clearSecondary();
  }

  if (ped.isInAnyVehicle(true)) {
    ped.weapon.setCurrentWeaponVisible(true, true);
  }

  LocalPlayer.ped.setConfigFlag(36, false);
  ped.tasks.clearSecondary();
  mpPointing = false;
}

setTick(async () => {
  const { ped } = LocalPlayer;
  const onFoot = ped.isOnFoot;

  if (Control.JustPressed(29) && !mpPointing && onFoot) {
    startPointing();
    await Delay(700);
  } else if (Control.JustPressed(29) && mpPointing) {
    stopPointing();
    await Delay(700);
  } else if (!onFoot && mpPointing) {
    stopPointing();
    await Delay(700);
  }
});

setTick(async () => {
  const { ped } = LocalPlayer;
  if (!IsTaskMoveNetworkActive(ped.handle)) {
    return;
  }

  if (!mpPointing || !ped.isOnFoot) {
    stopPointing();
    return;
  }

  let camPitch = clamp(GetGameplayCamRelativePitch(), -70.0, 42.0);
  camPitch = (camPitch + 70.0) / 112.0;

  let camHeading = GetGameplayCamRelativeHeading();
  camHeading = clamp(camHeading, -180.0, 180.0);
  const cosCamHeading = Cos(camHeading);
  const sinCamHeading = Sin(camHeading);
  camHeading = (camHeading + 180.0) / 360.0;

  let blocked = false;
  const nn = 0;

  let coords = GetOffsetFromEntityInWorldCoords(
    ped.handle,
    cosCamHeading * -0.2 - sinCamHeading * (0.4 * camHeading + 0.3),
    sinCamHeading * -0.2 + cosCamHeading * (0.4 * camHeading + 0.3),
    0.6,
  );
  const ray = Cast_3dRayPointToPoint(
    coords[0],
    coords[1],
    coords[2] - 0.2,
    coords[0],
    coords[1],
    coords[2] + 0.2,
    0.4,
    95,
    ped.handle,
    7,
  );
  [, blocked, coords, coords] = GetRaycastResult(ray);

  ped.tasks.setPropertyFloat('Pitch', camPitch);
  ped.tasks.setPropertyFloat('Heading', camHeading * -1.0 + 1.0);
  ped.tasks.setPropertyBool('isBlocked', blocked);
  ped.tasks.setPropertyBool('isFirstPerson', GetCamViewModeForContext(GetCamActiveViewModeContext()) == 4);
});
