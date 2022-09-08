import { Vector3 } from '../../shared/Math';
import { promiseTimeout } from '../../shared/Utils';
import { Entity } from './Entity';
import type { Ped } from './Ped';
import { loadModel } from '../Utils';

export enum VehicleSeat {
  ANY_PASSENGER  = -2,
  DRIVER = -1,
  FRONT_PASSENGER = 0,
  REAR_LEFT = 1,
  REAR_RIGHT = 2,
}

export enum VehicleDoor {
  DOOR_DSIDE_F = 0,
  DOOR_DSIDE_R = 1,
  DOOR_PSIDE_F = 2,
  DOOR_PSIDE_R = 3,
  BONNET = 4,
  BOOT = 5,
}

export class Vehicle extends Entity {


  get liquid(): { name: string; amount: number } {
    return this.state['liquid'] || { name: 'none', amount: 0 };
  }

  static FromEntity(entity: Entity): Vehicle {
    if (!IsEntityAVehicle(entity.handle)) {
      throw new Error('Unable to cast Entity to Vehicle!');
    }

    return new Vehicle(entity.handle);
  }

  get vehicleClass() {
    return GetVehicleClass(this.handle);
  }

  static getClosest(coords: Vector3, radius = 5.0, model?: string, flags: number = 70): Vehicle {
    const modelHash = model ? GetHashKey(model) : 0;
    return new Vehicle(GetClosestVehicle(coords.x, coords.y, coords.z, radius, modelHash, flags))
  }

  remove(): void {
    SetEntityAsMissionEntity(this.handle, false, true);
    DeleteVehicle(this.handle);
  }

  get networkId(): number {
    return NetworkGetNetworkIdFromEntity(this.handle);
  }

  isEmpty(): boolean {
    return this.numberOfPassengers == 0 && this.isSeatFree(-1);
  }

  isSeatFree(seatId = VehicleSeat.ANY_PASSENGER): boolean {
    return !!IsVehicleSeatFree(this.handle, seatId);
  }

  isDoorDamaged(doorId: VehicleDoor): boolean {
    return IsVehicleDoorDamaged(this.handle, doorId);
  }

  getDoorAngleRatio(doorId: VehicleDoor): number {
    return GetVehicleDoorAngleRatio(this.handle, doorId);
  }

  getPedInVehicleSeat(seatId: VehicleSeat): Entity {
    return new Entity(GetPedInVehicleSeat(this.handle, seatId))
  }

  isDriver(ped: Ped): boolean {
    const vehPed = this.getPedInVehicleSeat(VehicleSeat.DRIVER)
    if (!vehPed || !vehPed.exist) return false;

    return vehPed.handle == ped.handle
  }

  get plateText(): string {
    return GetVehicleNumberPlateText(this.handle).trim();
  }

  set plateText(value: string) {
    SetVehicleNumberPlateText(this.handle, value);
  }

  get dirtLevel(): number {
    return GetVehicleDirtLevel(this.handle);
  }

  set dirtLevel(dirtLevel: number) {
    SetVehicleDirtLevel(this.handle, dirtLevel);
  }

  get numberOfPassengers(): number {
    return GetVehicleNumberOfPassengers(this.handle);
  }

  get engineHealth(): number {
    return GetVehicleEngineHealth(this.handle);
  }

  set engineHealth(value: number) {
    SetVehicleEngineHealth(this.handle, value);
  }

  set hasMutedSirens(value: boolean) {
    SetVehicleHasMutedSirens(this.handle, value);
  }

  get isSirenOn(): boolean {
    return IsVehicleSirenOn(this.handle);
  }

  /**
   * in meters per second
   */
  set forwardSpeed(value: number) {
    SetVehicleForwardSpeed(this.handle, value);
  }

  static async Spawn(
    model: string,
    coords: Vector3,
    heading = 0.0,
    isNetwork = true,
    netMissionEntity = false,
  ): Promise<Vehicle> {
    const promise = new Promise<Vehicle>((resolve, reject) => {
      setImmediate(async () => {
        await loadModel(model);

        const vehicle = new Vehicle(
          CreateVehicle(model, coords.x, coords.y, coords.z, heading, isNetwork, netMissionEntity),
        );

        SetModelAsNoLongerNeeded(model);

        if (!vehicle.exist) reject(new Error(`Транспорт не создан!`));

        const { networkId } = vehicle;
        const { handle } = vehicle;

        SetNetworkIdCanMigrate(networkId, true);
        SetEntityAsMissionEntity(handle, true, false);
        SetVehicleHasBeenOwnedByPlayer(handle, true);
        SetVehicleNeedsToBeHotwired(handle, false);
        SetVehRadioStation(handle, 'OFF');

        RequestCollisionAtCoord(coords.x, coords.y, coords.z);

        resolve(vehicle);
      });
    });

    return promiseTimeout<Vehicle>(promise, 10000);
  }

  static get None(): Vehicle {
    return new Vehicle(0);
  }
}
