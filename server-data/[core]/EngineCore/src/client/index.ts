import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Delay, Log, Vector2, Vector3 } from '@nova/engine-lib/shared';
import { ClientCallback } from './Core/ClientCallback';

export * from './Core';
export * from './Game';

console.log('CLIENT CORE IS STARTING');

ClientCallback.Register('engine:teleport', (coords: Vector3): void => {
  LocalPlayer.ped.coords = coords;
});

ClientCallback.Register('engine:teleportXY', (x: number, y: number, heading?: number): void => {
  LocalPlayer.ped.teleportXY(new Vector2(x, y), heading);
});

ClientCallback.Register('engine:setHealth', (health: number): void => {
  LocalPlayer.ped.health = health;
});

ClientCallback.Register('engine:revive', (): void => {
  LocalPlayer.revive();
});
