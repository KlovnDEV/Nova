import { LocalPlayer, Ped, Vehicle, VehicleDoor, VehicleSeat } from '@nova/engine-lib/client/Game';
import { Sprite } from '@nova/engine-lib/client/Graphics';
import { Menu, showNotification } from '@nova/engine-lib/client/UI';
import { Delay, Vector2, Vector3 } from '@nova/engine-lib/shared';
import { Control, Controls } from '@nova/engine-lib/client/Input';
import { ServerCallback } from '@nova/engine-lib/client/Core';

const TrunkSprite = new Sprite({
  coords: new Vector3(0, 0, 0),
  scale: new Vector2(0.1, 0.1),
  textureDict: 'spritedict',
  textureName: 'cartrunk',
  alpha: 255,
  color: [255, 255, 255],
  drawDistance: 10.0,
  // distanceFade: false,
});

function GetVehicleUid(veh: Vehicle): number {
  return veh.decor.getInt('Owned_Vehicle_Id');
}

function VehicleInFront(): [Vehicle, Vector3] {
  const pos = LocalPlayer.coords;
  const entityWorld = Vector3.FromArray(GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0.0, 4.0, 0.0));
  const rayHandle = StartShapeTestCapsule(
    pos.x,
    pos.y,
    pos.z,
    entityWorld.x,
    entityWorld.y,
    entityWorld.z,
    0.3,
    10,
    GetPlayerPed(-1),
    0,
  );

  const [numRayHandle, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(rayHandle);
  if (IsEntityAVehicle(entityHit)) {
    return [new Vehicle(entityHit), Vector3.FromArray(endCoords)];
  }

  return [new Vehicle(0), null];
}

function getVehicleBootInventory(veh: Vehicle, cb) {
  const locked = GetVehicleDoorLockStatus(veh.handle);
  const vehClass = veh.vehicleClass;

  const pedDriver = Ped.FromEntity(veh.getPedInVehicleSeat(VehicleSeat.DRIVER));
  if (pedDriver.exist && pedDriver.isPlayer) {
    cb(null);
    return;
  }

  const uid = GetVehicleUid(veh);

  if (locked == 1 || vehClass == 15 || vehClass == 16 || vehClass == 14) {
    ServerCallback.Trigger('trunks:registerTrunk', uid, veh.plateText).then(cb);
  }
}

onNet('trunks:getVehicleBootInventory', function (veh, cb) {
  getVehicleBootInventory(veh, cb);
});

function openBoot(veh: Vehicle) {
  Menu.hideAll();

  getVehicleBootInventory(veh, function (...args) {
    const inventoryContainer = args[0];
    if (!inventoryContainer) {
      showNotification('Багажник закрыт ~r~');
      return;
    }

    emitNet('inventory:openInventories', [
      { category: 'player-inventory' },
      { category: inventoryContainer.category, identifier: inventoryContainer.identifier },
    ]);
  });
}

// Key controls
setTick(async () => {
  const [closecar, vehPos] = VehicleInFront();
  if (!closecar.exist) {
    TrunkSprite.alpha = 0;
    await Delay(100);
    return;
  }

  const playerPos = LocalPlayer.coords;
  let dist = 10000.0;

  if (vehPos) {
    dist = playerPos.distanceTo(vehPos);
  }

  const vehClass = GetVehicleClass(closecar.handle);

  if (vehClass != 15 && vehClass != 16 && vehClass != 14 && vehClass != 13) {
    let hasBoot = true;

    const boneDists: Record<string, number> = {};
    const bonePositions: Record<string, Vector3> = {};

    for (const BoneName of ['boot']) {
      //			for _,BoneName in pairs({ 'bonnet', 'boot', 'handle_pside_f', 'handle_pside_r', 'handle_dside_f', 'handle_dside_r' }) do
      const BonePos = Vector3.FromArray(
        GetWorldPositionOfEntityBone(closecar.handle, GetEntityBoneIndexByName(closecar.handle, BoneName)),
      );
      const boneDist = playerPos.distanceTo(BonePos);

      if (BonePos.length > 0) {
        boneDists[BoneName] = boneDist;
        bonePositions[BoneName] = BonePos;
      }
    }

    if (closecar.isDoorDamaged(VehicleDoor.BOOT) || !boneDists.boot) {
      hasBoot = false;
    }

    const isBootOpen = closecar.getDoorAngleRatio(5) > 0.1;
    let canAccessBoot = false;

    if (boneDists.boot && hasBoot && boneDists.boot < 2.0 && isBootOpen) {
      TrunkSprite.coords = bonePositions.boot;
      TrunkSprite.alpha = 255;
      canAccessBoot = true;
    } else if (
      hasBoot == false &&
      playerPos.distanceTo(vehPos) < 5.0 &&
      closecar.getPedInVehicleSeat(VehicleSeat.DRIVER).handle != LocalPlayer.ped.handle &&
      closecar.getDoorAngleRatio(VehicleDoor.DOOR_DSIDE_F) > 0.1
    ) {
      TrunkSprite.coords = closecar.coords.addXYZ(0, 0, 1);
      TrunkSprite.alpha = 255;
      canAccessBoot = true;
    } else {
      TrunkSprite.alpha = 0;
    }

    TrunkSprite.draw();

    if (Control.JustPressed(Controls.CELLPHONE_CAMERA_FOCUS_LOCK)) {
      const pedInSeat = closecar.getPedInVehicleSeat(VehicleSeat.DRIVER) as Ped;
      const inDriverSeat = pedInSeat.exist && pedInSeat.isLocal;

      if (hasBoot && !isBootOpen) {
        showNotification('Багажник закрыт');
      } else if (!canAccessBoot) {
        // do nothing
      } else if (!inDriverSeat) {
        if (boneDists.boot && hasBoot && boneDists.boot < 2.0) {
          openBoot(closecar);
        } else if (dist < 2.5) {
          openBoot(closecar);
        }
      } else if (hasBoot == false && playerPos.distanceTo(vehPos) < 5.0 && !inDriverSeat) {
        openBoot(closecar);
      }
    }
  }
});
