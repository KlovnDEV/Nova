import { Marker, Sprite } from '@nova/engine-lib/client/Graphics';
import { Vector2, Vector3 } from '@nova/engine-lib/shared';

import Config from '../../config/lockers';

export type ConfigZone = {
  category: string;
  identifier: string;
  title: string;
  coords: { x: number; y: number; z: number };
  drawDistance: number;
  maxWeight: number;
  width?: number;
  height?: number;
};

class Markers {
  private onPress = (zone: ConfigZone) => {};
  // private blips: Blip[] = [];
  private markers: Marker[] = [];
  private sprites: Sprite[] = [];

  constructor(onPress: (zone: ConfigZone) => void) {
    this.onPress = onPress;
    Config.Zones.forEach(zone => {
      // this.createBlip(coords);
      const sprite = Markers.createSprite(zone);
      this.sprites.push(sprite);

      const marker = Markers.createMarker(
        zone,
        () => {
          this.onPress(zone);
        },
        () => {
          sprite.textureName = 'locker_e';
        },
        () => {
          sprite.textureName = 'locker';
        },
      );
      this.markers.push(marker);
    });
  }

  // createBlip(coords: Vector3): void {
  //   const blip = new Blip({
  //     coords,
  //     sprite: 100,
  //     text: 'Автомойка',
  //   });

  //   this.blips.push(blip);
  // }

  static createSprite(zone: ConfigZone): Sprite {
    const sprite = new Sprite({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      scale: new Vector2(0.1, 0.1),
      textureDict: 'spritedict',
      textureName: 'locker',
      alpha: 255,
      color: [255, 255, 255],
      drawDistance: zone.drawDistance,
    });

    return sprite;
  }

  static createMarker(zone: ConfigZone, onPress: any, onEnter: any, onExit: any): Marker {
    const marker = new Marker({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      markerType: -1,
      scale: new Vector3(2, 2, 1),
      notificationText: `Нажмите ~INPUT_PICKUP~ для доступа к шкафчику`,
      drawDistance: zone.drawDistance,
      onPress,
      onEnter,
      onExit,
    });

    return marker;
  }

  draw(): void {
    this.markers.forEach(marker => {
      marker.draw();
    });

    this.sprites.forEach(sprite => {
      sprite.draw();
    });
  }
}

export default Markers;
