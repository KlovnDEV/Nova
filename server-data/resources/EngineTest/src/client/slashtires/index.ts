/* eslint-disable no-bitwise */
import {
  AnimationFlags,
  LocalPlayer,
  Ped,
  Players,
  Prop,
  Vehicle,
  Vehicles,
  VehicleSeat,
  Player,
} from '@nova/engine-lib/client/Game';
import { tireChangeTick } from './tireChange';
import { tireSlashTick } from './tireSlash';
import { CanUseWeapon } from './utils';

setTick(async () => {
  const { ped } = LocalPlayer;
  const [vehicle, dist] = Vehicles.getClosest(LocalPlayer.coords);

  const isTireChangeActive = await tireChangeTick(ped, vehicle);

  if (!isTireChangeActive && vehicle.exist && CanUseWeapon()) {
    await tireSlashTick(ped, vehicle);
  }
});
