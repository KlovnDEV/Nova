/* eslint-disable no-param-reassign */
import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Blip, Marker } from '@nova/engine-lib/client/Graphics';
import { Delay, Vector3 } from '@nova/engine-lib/shared';
import Config from '../../config/teleports';

// TODO: учитывать роли

type ConfigEntry = {
  enter: any;
  exit: any;
  blip: any;
  job: string;
};

const defaultMarker = {
  markerType: Config.Marker.markerType,
  scale: Vector3.FromArray(Config.Marker.scale),
  color: Config.Marker.scale,
  alpha: Config.Marker.alpha,
  drawDistance: Config.Marker.drawDistance,
};

async function teleport(x: number, y: number, z: number, h?: number): Promise<boolean> {
  DoScreenFadeOut(200);
  await Delay(300);
  const result = await LocalPlayer.ped.teleport(new Vector3(x, y, z), h);
  DoScreenFadeIn(200);

  return result;
}

Object.entries(Config.Teleporters).forEach(([key, entry]: [string, ConfigEntry]) => {
  if (entry.blip) {
    entry.blip.instance = new Blip(entry.blip);
  }

  if (entry.enter) {
    entry.enter.instance = new Marker({
      ...defaultMarker,
      coords: new Vector3(entry.enter.x, entry.enter.y, entry.enter.z + 0.96),
      notificationText: entry.enter.information || 'Нажмите ~INPUT_PICKUP~ чтобы ~b~войти~s~',
      onPress: () => {
        teleport(entry.exit.x, entry.exit.y, entry.exit.z);
      },
    });
  }

  if (entry.exit) {
    entry.exit.instance = new Marker({
      markerType: 27,
      scale: new Vector3(1.5, 1.5, 1.5),
      color: [255, 255, 255],
      alpha: 100,
      coords: new Vector3(entry.exit.x, entry.exit.y, entry.exit.z + 0.96),
      notificationText: entry.exit.text || 'Нажмите ~INPUT_PICKUP~ чтобы ~g~выйти~s~',
      onPress: () => {
        teleport(entry.enter.x, entry.enter.y, entry.enter.z);
      },
    });
  }
});

setTick(() => {
  Object.entries(Config.Teleporters).forEach(([key, entry]: [string, ConfigEntry]) => {
    if (entry?.enter?.instance) {
      entry.enter.instance.draw();
    }
    if (entry?.exit?.instance) {
      entry.exit.instance.draw();
    }
  });
});
