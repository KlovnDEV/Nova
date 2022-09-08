/* Частично не реализовано */
/* eslint-disable no-param-reassign */
import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Delay, Log } from '@nova/engine-lib/shared';
import { doorList, ConfigZone } from './doorlist';
import Config from '../../config/doorlock';
import Markers from './markers';

let markerWorked = false;

function IsAuthorized(id: string, door: ConfigZone) {
  if (!door) return false;

  // FIXME keys
  // if (doorKeys[k]) return true;
  // if (door.group && doorKeys[door.group]) return true;

  if (door.authorizedRoles) {
    const { roles } = LocalPlayer;

    if (door.authorizedRoles.some(role => roles[role])) return true;

    return false;
  }

  return false;
}

function SetDoorLocked(id: number, val: boolean, openRatioThreshold = 0.15) {
  if (val && Math.abs(DoorSystemGetOpenRatio(id)) < openRatioThreshold) {
    if (DoorSystemGetDoorState(id) != 1) {
      DoorSystemSetDoorState(id, 1, false, false);
    }
  } else if (DoorSystemGetDoorState(id) != 0) {
    DoorSystemSetDoorState(id, 0, false, false);
  }
}

async function tick() {
  const playerCoords = LocalPlayer.coords;

  Object.entries(doorList).forEach(([doorId, door]: [string, ConfigZone]) => {
    const isAuthorized = IsAuthorized(doorId, door);
    door.authorized = isAuthorized;

    const distance = playerCoords.distanceTo(door.textCoords);
    // const maxDistance = door.distance || 1.5;

    if (distance < 50) {
      Markers.updateDoorSpriteTexture(door, isAuthorized);
      if (door.doors) {
        door.doors.forEach(v => {
          SetDoorLocked(v.id, door.locked, door.openRatioThreshold);
        });
      } else {
        SetDoorLocked(door.id, door.locked, door.openRatioThreshold);
      }
    }

    // if (distance < maxDistance) {
    //   const displayText = '';
    //   let size = 0.5;

    //   if (door.size) {
    //     size = door.size;
    //   }

    //   closestDoor = k;
    // }
  });
}

const markers = new Markers((zoneId: string, zone: ConfigZone) => {
  if (markerWorked) return;
  markerWorked = true;

  if (zone.authorized) {
    zone.locked = !zone.locked;
    emitNet('doorlock:updateState', zoneId, zone.locked);
    // tick();
  }
  // Markers.updateDoorSpriteTexture(zone);
});

emitNet('doorlock:getDoorInfo');

setTick(async () => {
  markerWorked = false;
  markers.draw();
});

if (Config.Debug) {
  setTick(async () => {
    const playerCoords = LocalPlayer.coords;
    Object.entries(doorList).forEach(([doorId, door]: [string, ConfigZone]) => {
      const distance = playerCoords.distanceTo(door.textCoords);

      if (distance < 50) {
        if (door.doors) {
          door.doors.forEach(v => {
            DrawBox(
              v.objCoords.x - 0.05,
              v.objCoords.y - 0.05,
              v.objCoords.z - 0.05,
              v.objCoords.x + 0.05,
              v.objCoords.y + 0.05,
              v.objCoords.z + 0.05,
              50,
              255,
              70,
              0.5,
            );
            SetDoorLocked(v.id, door.locked, door.openRatioThreshold);
          });
        } else {
          SetDoorLocked(door.id, door.locked, door.openRatioThreshold);
        }
      }
    });
  });
}

setTick(async () => {
  await Delay(1000);
  await tick();
});

onNet('doorlock:setState', (doors: Record<string, boolean>) => {
  Object.entries(doors).forEach(([key, val]) => {
    doorList[key].locked = val;
  });
  tick();
});
