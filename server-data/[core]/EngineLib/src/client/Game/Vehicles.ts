import { Vector3 } from "../../shared";
import { findIterator } from "../Utils";
import { LocalPlayer } from "./LocalPlayer";
import { Vehicle } from "./Vehicle";

export class Vehicles {
  static get(): Vehicle[] {
    const vehicles = findIterator(FindFirstVehicle, FindNextVehicle, EndFindVehicle);
    return vehicles.map((id) => new Vehicle(id)).filter((veh) => veh.exist);
 }

 static getClosest(coords: Vector3 = LocalPlayer.coords, filter: {(vehicle: Vehicle, index?: number): boolean} = null): [Vehicle, number] {
  let vehicles = Vehicles.get();
  if (filter) vehicles = vehicles.filter(filter);
  if (vehicles.length == 0) return [Vehicle.None, Infinity];

  const distances = vehicles.map((veh) => coords.distanceTo(veh.coords));
  const minDist = Math.min(...distances);
  const index = distances.findIndex((dist) => dist == minDist);
  return [vehicles[index], minDist];
 }
}