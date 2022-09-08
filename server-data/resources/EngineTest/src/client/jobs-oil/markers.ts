import { Marker, Sprite } from '@nova/engine-lib/client/Graphics';
import { Log, Vector2, Vector3 } from '@nova/engine-lib/shared';

import Config from '../../config/jobs-oil';

export type ConfigZone = {
  type: string;
  coords: { x: number; y: number; z: number };
  store: { max: number; current: number };
  description: string;
  brand: string;
  index: number;
  id: number;
};

class Markers {
  insideZone: ConfigZone;
  private onPress = (zone: ConfigZone) => {};
  // private blips: Blip[] = [];
  private markers: Marker[] = [];
  private sprites: Sprite[] = [];

  constructor(onPress: (zone: ConfigZone) => void) {
    this.onPress = onPress;
    Config.Zones.forEach((zone, index) => {
      zone.id = index;
      // this.createBlip(coords);
      const sprite = Markers.createSprite(zone);
      this.sprites.push(sprite);

      const marker = Markers.createMarker(
        zone,
        () => {
          this.onPress(zone);
        },
        () => {
          sprite.textureName = 'gasstation_e';
          this.insideZone = zone;
        },
        () => {
          sprite.textureName = 'gasstation';
          this.insideZone = null;
        },
      );
      this.markers.push(marker);
    });
  }

  static createSprite(zone: ConfigZone): Sprite {
    const sprite = new Sprite({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      scale: new Vector2(0.1, 0.1),
      textureDict: 'spritedict',
      textureName: 'gasstation',
      alpha: 255,
      color: [255, 255, 255],
    });

    return sprite;
  }

  static createMarker(zone: ConfigZone, onPress: any, onEnter: any, onExit: any): Marker {
    const marker = new Marker({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      markerType: -1,
      scale: new Vector3(2, 2, 1),
      notificationText: `Нажмите ~INPUT_PICKUP~ для доступа`,
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
