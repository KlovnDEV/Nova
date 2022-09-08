import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Delay, Log, Vector3 } from '@nova/engine-lib/shared';
import { ClientCallback } from '../Core/ClientCallback';

ClientCallback.Register('engine:teleport', async (coords: Vector3) => {
  const handle = GetPlayerPed(PlayerId());
  SetEntityCoords(handle, coords.x, coords.y, coords.z, true, false, false, false);
});

let playerLoaded = false;

onNet('skin:modelLoaded', async () => {
  if (playerLoaded) return;

  await Delay(1000);

  if (LocalPlayer.state.status.health) {
    LocalPlayer.ped.health = LocalPlayer.state.status.health - 1;
  }

  playerLoaded = true;
});

setTick(async () => {
  await Delay(1000);

  const { ped } = LocalPlayer;
  const { coords } = ped;
  const forward = ped.forwardVector;

  if (!LocalPlayer.state.coords || Vector3.FromArray(LocalPlayer.state.coords).distanceTo(coords) > 0.1) {
    LocalPlayer.state.set('coords', coords.toArray(), true);
  }

  if (!LocalPlayer.state.forward || Vector3.FromArray(LocalPlayer.state.forward).distanceTo(forward) > 0.1) {
    LocalPlayer.state.set('forward', forward.toArray(), true);
  }

  // if (playerLoaded) {
  LocalPlayer.state.set('health', LocalPlayer.ped.health, true);
  // }
});
