import { LocalPlayer, Ped, Players, Player, Vehicle, VehicleSeat } from '@nova/engine-lib/client/Game';
import { drawText3D } from '@nova/engine-lib/client/Graphics';
import { loadAnimDict } from '@nova/engine-lib/client/Utils';
import { Vector3, Delay } from '@nova/engine-lib/shared';
import { GetClosestVehicleTire } from './utils';

function GetDriverOfVehicle(vehicle: Vehicle): Player {
  const ped = vehicle.getPedInVehicleSeat(VehicleSeat.DRIVER);
  if (!ped.exist) return null;

  for (const player of Players.All()) {
    if (player.ped.handle == ped.handle) {
      return player;
    }
  }

  return null;
}

onNet('slashtires:slash', function (pos, model, tireIndex) {
  const vehicle = GetClosestVehicle(pos.x, pos.y, pos.z, 1.0, model, 71);
  if (vehicle > 0) {
    SetVehicleTyreBurst(vehicle, tireIndex, false, 100.0);
  }
});

onNet('slashtires:repair', function (pos, model, tireIndex) {
  const vehicle = GetClosestVehicle(pos.x, pos.y, pos.z, 1.0, model, 71);
  if (vehicle > 0) {
    SetVehicleTyreFixed(vehicle, tireIndex);
  }
});

onNet('slashtires:SlashClientTire', function (tireIndex) {
  TriggerEvent('chatMessage', '^1A вам прокалывают колесо');
  const player = PlayerId();
  const ped = GetPlayerPed(player);
  const vehicle = GetVehiclePedIsIn(ped, false);
  SetVehicleTyreBurst(vehicle, tireIndex, false, 100.0);
});

export async function tireSlashTick(ped: Ped, vehicle: Vehicle): Promise<void> {
  const animDict = 'melee@knife@streamed_core_fps';
  const animName = 'ground_attack_on_spot';
  const closestTire = GetClosestVehicleTire(vehicle);
  if (closestTire != null) {
    if (IsVehicleTyreBurst(vehicle.handle, closestTire.tireIndex, false) == false) {
      drawText3D(Vector3.FromArray(closestTire.bonePos), '~r~[E] Проткнуть колесо');
      if (IsControlJustPressed(1, 38)) {
        await loadAnimDict(animDict);
        const animDuration = GetAnimDuration(animDict, animName);
        TaskPlayAnim(ped.handle, animDict, animName, 8.0, -8.0, animDuration, 15, 1.0, false, false, false);
        await Delay((animDuration / 2) * 1000);
        const driverOfVehicle = GetDriverOfVehicle(vehicle);
        const driverServer = driverOfVehicle ? driverOfVehicle.serverId : 0;
        if (driverServer == 0) {
          SetVehicleTyreBurst(vehicle.handle, closestTire.tireIndex, false, 100.0);
        } else {
          TriggerServerEvent('slashtires:TargetClient', driverServer, closestTire.tireIndex);
        }
        TriggerServerEvent('slashtires:slash', vehicle.coords.toArray(), vehicle.model, closestTire.tireIndex);
        await Delay((animDuration / 2) * 1000);
        ped.tasks.clear(true);
      }
    }
  }
}
