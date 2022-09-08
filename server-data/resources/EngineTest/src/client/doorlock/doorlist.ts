import { Marker, Sprite } from '@nova/engine-lib/client/Graphics';
import { Vector3 } from '@nova/engine-lib/shared';
import Config from '../../config/doorlock';

export type ConfigZoneSubDoor = {
  objName: string;
  objCoords: Vector3;
  id: number;
};

export type ConfigZone = {
  objName: string;
  objCoords: Vector3;
  textCoords: Vector3;
  distance?: number;
  group?: string;
  locked?: boolean;
  authorizedRoles?: Array<string>;
  doors?: ConfigZoneSubDoor[];
  openRatioThreshold?: number;
  size?: number;

  id?: number;
  idStr?: string;
  inside?: boolean;
  authorized?: boolean;
  sprite?: Sprite;
  marker?: Marker;
};


export const doorList: Record<string, ConfigZone> = {};

function RegisterDoor(id: number, prop: string, coords: Vector3) {
  RemoveDoorFromSystem(id);
  AddDoorToSystem(id, prop, coords.x, coords.y, coords.z, false, false, false);
}

Object.entries(Config.DoorList).forEach(([key, val]: [string, any]) => {
  const subdoors = val.doors?.map(v => {
    return {
      objName: v.objName,
      objCoords: Vector3.FromArray(v.objCoords),
    };
  });

  const door = {
    id: GetHashKey(key),
    objName: val.objName,
    objCoords: val.objCoords ? Vector3.FromArray(val.objCoords) : undefined,
    textCoords: val.textCoords ? Vector3.FromArray(val.textCoords) : undefined,
    distance: val.distance || 1.5,
    locked: val.locked || false,
    authorizedRoles: val.authorizedRoles,
    doors: subdoors,
    openRatioThreshold: val.openRatioThreshold,
    size: val.size,
    inside: false,
    sprite: undefined,
    marker: undefined,
  };

  doorList[key] = door;

  if (door.objName) RegisterDoor(door.id, door.objName, door.objCoords);
  else if (door.doors) {
    door.doors.forEach((v: ConfigZoneSubDoor, index) => {
      v.id = GetHashKey(`${door.id}#${index}`);
      RegisterDoor(v.id, v.objName, v.objCoords);
      // Log.debug('Register door', v.id, v.objName, v.objCoords);
    });
  }
});
