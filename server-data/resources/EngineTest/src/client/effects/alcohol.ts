import { LocalPlayer, VehicleSeat } from '@nova/engine-lib/client/Game';
import { loadAnimSet } from '@nova/engine-lib/client/Utils';
import { Delay, Random } from '@nova/engine-lib/shared';
import Config from '../../config/effects';

let currentDrunkLevel = 0;

async function updateDrunk(level: number) {
  const start = currentDrunkLevel == 0;
  const { ped } = LocalPlayer;

  if (start) {
    SetTransitionTimecycleModifier('DRUNK', 3.5);
  } else {
    SetTransitionTimecycleModifier('DRUNK', 0.35);
  }

  let anim = null;

  if (level > 8) {
    anim = 'move_m@drunk@verydrunk';
  } else if (level > 6) {
    anim = 'move_m@drunk@moderatedrunk';
  } else if (level > 4) {
    anim = 'move_m@drunk@slightlydrunk';
  }

  if (anim) {
    await loadAnimSet(anim);
    SetPedMovementClipset(ped.handle, anim, 1);
  } else {
    ResetPedMovementClipset(ped.handle, 0);
  }

  SetPedIsDrunk(ped.handle, true);

  SetTimecycleModifierStrength(level / 15.0);
  // SetTimecycleModifier('spectator5');
  SetPedMotionBlur(ped.handle, true);
}

async function backToReality() {
  const playerPed = LocalPlayer.ped.handle;

  //		DoScreenFadeOut(800)
  await Delay(1000);

  SetTransitionTimecycleModifier('default', 3.5);
  //		ClearTimecycleModifier()
  ResetScenarioTypesEnabled();
  ResetPedMovementClipset(playerPed, 0);
  SetPedIsDrunk(playerPed, false);
  SetPedMotionBlur(playerPed, false);
  await Delay(3500);

  //		DoScreenFadeIn(800)
}

function drunkInCar() {
  const { ped } = LocalPlayer;
  const { vehicle } = ped;
  const driver = vehicle.getPedInVehicleSeat(VehicleSeat.DRIVER);

  if (driver.exist && driver.handle == ped.handle && currentDrunkLevel > 6) {
    const vehClass = vehicle.vehicleClass;
    const { speed } = vehicle;

    if (speed != 0 && vehClass != 15 && vehClass != 16 && vehClass != 21 && vehClass != 13) {
      if (Random.randint(0, 4) < currentDrunkLevel - 6) {
        const drunkMov = Random.choice(Config.RandomVehicleInteraction);
        TaskVehicleTempAction(ped.handle, vehicle.handle, drunkMov.interaction, drunkMov.time);
      }
    }
  }
}

setTick(async () => {
  await Delay(1000);
  // const { handle } = LocalPlayer;

  const { alcohol } = LocalPlayer.status;
  // const alcoholAddiction = LocalPlayer.status['alcohol-addiction'];

  if (alcohol > 0) {
    const level = Math.floor(alcohol / 10.0);
    drunkInCar();

    if (level != currentDrunkLevel) {
      updateDrunk(level);
      currentDrunkLevel = level;
    }
  } else {
    backToReality();
    currentDrunkLevel = 0;
  }
});
