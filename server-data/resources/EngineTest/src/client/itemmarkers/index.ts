import { Blip, Marker } from '@nova/engine-lib/client/Graphics';
import { Vector3 } from '@nova/engine-lib/shared';

import Config from '../../config/itemmarkers';

type TZoneInfo = {
  DrawDistance: number;
  Notification: string;
  Blip: number;
  Label: string;
  coords: Vector3;
  Item: { name: string };
  marker?: Marker;
};

(async () => {
  Config.Zones.forEach(async (zone: TZoneInfo, index: number) => {
    const blip = new Blip({
      coords: zone.coords,
      text: zone.Label,
      sprite: zone.Blip,
      scale: 0.8,
      // eslint-disable-next-line no-bitwise
      color: (GetHashKey(zone.Item.name) >>> 0) % 100,
    });

    const marker = new Marker({
      coords: zone.coords,
      notificationText: `Нажмите ~INPUT_PICKUP~ чтобы ${zone.Notification}`,
      drawDistance: zone.DrawDistance || 20,
      onPress: () => {
        emitNet('itemmarkers:giveitem', index);
      },
    });

    Object.assign(zone, {
      blipObj: blip,
      id: index,
      marker,
    });
  });
})();

setTick(async () => {
  Config.Zones.forEach((zone: TZoneInfo) => {
    zone.marker.draw();
  });
});
