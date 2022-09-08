import { Vehicle, LocalPlayer } from '@nova/engine-lib/client/Game';
import { Vector3 } from '@nova/engine-lib/shared';

export function GetClosestVehicleTire(vehicle: Vehicle) {
  const tireBones = [
    'wheel_lf',
    'wheel_rf',
    'wheel_lm1',
    'wheel_rm1',
    'wheel_lm2',
    'wheel_rm2',
    'wheel_lm3',
    'wheel_rm3',
    'wheel_lr',
    'wheel_rr',
  ];
  const tireIndex = {
    wheel_lf: 0,
    wheel_rf: 1,
    wheel_lm1: 2,
    wheel_rm1: 3,
    wheel_lm2: 45,
    wheel_rm2: 47,
    wheel_lm3: 46,
    wheel_rm3: 48,
    wheel_lr: 4,
    wheel_rr: 5,
  };
  const { coords } = LocalPlayer.ped;
  const minDistance = 1.0;
  let closestTire = null;

  tireBones.forEach(tireBone => {
    const bonePos = GetWorldPositionOfEntityBone(vehicle.handle, GetEntityBoneIndexByName(vehicle.handle, tireBone));
    const distance = coords.distanceTo(Vector3.FromArray(bonePos));

    if (closestTire == null) {
      if (distance <= minDistance) {
        closestTire = {
          bone: tireBone,
          boneDist: distance,
          bonePos: bonePos,
          tireIndex: tireIndex[tireBone],
        };
      }
    } else if (distance < closestTire.boneDist) {
      closestTire = {
        bone: tireBone,
        boneDist: distance,
        bonePos: bonePos,
        tireIndex: tireIndex[tireBone],
      };
    }
  });

  return closestTire;
}

const allowedWeapons = [
  'WEAPON_KNIFE',
  'WEAPON_BOTTLE',
  'WEAPON_DAGGER',
  'WEAPON_HATCHET',
  'WEAPON_MACHETE',
  'WEAPON_SWITCHBLADE',
].map(s => GetHashKey(s));

export function CanUseWeapon() {
  return allowedWeapons.includes(LocalPlayer.ped.weapon.selected);
}
