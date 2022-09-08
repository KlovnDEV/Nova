/* eslint-disable no-bitwise */
import { AnimationFlags, LocalPlayer, Vehicle, Vehicles, VehicleSeat } from '@nova/engine-lib/client/Game';
import { Control, Controls, DisabledControl, Keys } from '@nova/engine-lib/client/Input';
import { showNotification } from '@nova/engine-lib/client/UI';
import { Delay, Vector3 } from '@nova/engine-lib/shared';

const Config: any = {};
Config.DamageNeeded = 999.8; // 100.0 being broken and 1000.0 being fixed a lower value than 100.0 will break it
Config.MaxWidth = 5.0; // Will complete soon
Config.MaxHeight = 5.0;
Config.MaxLength = 5.0;

type VehDataType = {
  Coords: Vector3;
  veh: Vehicle;
  Dimensions: Vector3;
  IsInFront: boolean;
  Distance: number;
};

let VehData: VehDataType = {
  Coords: null,
  veh: null,
  Dimensions: null,
  IsInFront: false,
  Distance: null,
};

setTick(async () => {
  await Delay(500);
  const { ped } = LocalPlayer;
  const [closestVehicle, distance] = Vehicles.getClosest();
  if (!closestVehicle) return;

  const vehicleCoords = closestVehicle.coords;
  const dimensions = GetModelDimensions(closestVehicle.model);

  if (distance < 4.0 && !ped.isInAnyVehicle()) {
    VehData.Coords = vehicleCoords;
    VehData.Dimensions = Vector3.FromArray(dimensions[0]);
    VehData.veh = closestVehicle;
    VehData.Distance = distance;

    if (
      closestVehicle.coords.add(closestVehicle.forwardVector).distanceTo(ped.coords) >
      closestVehicle.coords.add(closestVehicle.forwardVector.mul(-1)).distanceTo(ped.coords)
    ) {
      VehData.IsInFront = false;
    } else {
      VehData.IsInFront = true;
    }
  } else {
    VehData = { Coords: null, veh: null, Dimensions: null, IsInFront: false, Distance: null };
  }
});

async function pushVehicle() {
  const { ped } = LocalPlayer;
  const vehicle = VehData.veh;
  vehicle.requestControl();

  if (VehData.IsInFront) {
    ped.attachToEntity(
      vehicle,
      ped.getBoneIndex(6286),
      new Vector3(0.0, VehData.Dimensions.y * -1 + 0.1, VehData.Dimensions.z + 1.0),
      new Vector3(0, 0, 180),
      false,
      false,
      true,
      0,
      true,
    );
  } else {
    ped.attachToEntity(
      vehicle,
      ped.getBoneIndex(6286),
      new Vector3(0.0, VehData.Dimensions.y - 0.3, VehData.Dimensions.z + 1.0),
      Vector3.Zero,
      false,
      false,
      true,
      0,
      true,
    );
  }

  ped.tasks.playAnim({
    animDictionary: 'missfinale_c2ig_11',
    animationName: 'pushcar_offcliff_m',
    flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.REPEAT,
    blendInSpeed: 2.0,
  });

  await Delay(200);

  const vehicleHandle = vehicle.handle;
  while (true) {
    await Delay(0);
    if (DisabledControl.Pressed(Keys.A)) {
      TaskVehicleTempAction(PlayerPedId(), vehicleHandle, 11, 1000);
    }

    if (DisabledControl.Pressed(Keys.D)) {
      TaskVehicleTempAction(PlayerPedId(), vehicleHandle, 10, 1000);
    }

    vehicle.forwardSpeed = VehData.IsInFront ? -1.0 : 1.0;

    if (vehicle.hasCollidedWithAnything) {
      SetVehicleOnGroundProperly(vehicleHandle);
    }

    if (!DisabledControl.Pressed(Keys.E)) {
      DetachEntity(ped.handle, false, false);
      ped.tasks.stopAnimTask('missfinale_c2ig_11', 'pushcar_offcliff_m');
      ped.freezePosition = false;
      break;
    }
  }
}

setTick(async () => {
  const { ped } = LocalPlayer;
  if (
    VehData.veh != null &&
    VehData.veh.isSeatFree(VehicleSeat.DRIVER) &&
    VehData.veh.engineHealth <= Config.DamageNeeded
  ) {
    if (Control.Pressed(Controls.SPRINT) && Control.JustPressed(Keys.E) && !ped.isAttachedToEntity(VehData.veh)) {
      if (!VehData.veh.isUpsidedown || LocalPlayer.roles.mechanic || LocalPlayer.roles['mechanic-bennys']) {
        await pushVehicle();
      } else {
        showNotification('~r~Транспорт перевёрнут!~s~');
      }
    }
  }
});
