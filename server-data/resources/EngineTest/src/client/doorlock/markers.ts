import { Marker, Sprite } from '@nova/engine-lib/client/Graphics';
import { Vector2, Vector3 } from '@nova/engine-lib/shared';
import { doorList, ConfigZone } from './doorlist';

// import Config from '../../config/doorlock';

class Markers {
  private onPress = (zoneId: string, zone: ConfigZone) => {};
  // private blips: Blip[] = [];
  private markers: Marker[] = [];
  private sprites: Sprite[] = [];

  constructor(onPress: (zoneId: string, zone: ConfigZone) => void) {
    this.onPress = onPress;
    Object.entries(doorList).forEach(([zoneId, zone]: [string, ConfigZone]) => {
      // this.createBlip(coords);
      const sprite = Markers.createSprite(zone);
      this.sprites.push(sprite);

      const marker = Markers.createMarker(
        zone,
        () => {
          this.onPress(zoneId, zone);
        },
        () => {
          sprite.textureName = 'lock_on_e';
          // eslint-disable-next-line no-param-reassign
          zone.inside = true;
          Markers.updateDoorSpriteTexture(zone);
        },
        () => {
          sprite.textureName = 'lock_on';
          // eslint-disable-next-line no-param-reassign
          zone.inside = false;
          Markers.updateDoorSpriteTexture(zone);
        },
      );
      this.markers.push(marker);

      Object.assign(zone, {
        sprite,
        marker,
      });
    });
  }

  static createSprite(zone: ConfigZone): Sprite {
    const sprite = new Sprite({
      coords: zone.textCoords,
      scale: new Vector2(0.1, 0.1),
      textureDict: 'spritedict',
      textureName: 'lock_on',
      alpha: 255,
      color: [255, 255, 255],
      drawDistance: zone.distance || 2,
    });

    return sprite;
  }

  static createMarker(zone: ConfigZone, onPress: any, onEnter: any, onExit: any): Marker {
    const marker = new Marker({
      coords: zone.textCoords,
      markerType: 1,
      alpha: 0,
      scale: new Vector3(2, 2, 1),
      notificationText: `Нажмите ~INPUT_PICKUP~ чтобы открыть дверь~s~`,
      drawDistance: zone.distance || 2,
      onPress,
      onEnter,
      onExit,
    });

    return marker;
  }

  static getDoorSpriteIcon(zone: ConfigZone, inside = false, authorized = false): string {
    return `lock_${zone.locked ? 'on' : 'off'}${inside && authorized ? '_e' : ''}`;
  }

  static updateDoorSpriteTexture(zone: ConfigZone, authorized = false): void {
    // eslint-disable-next-line no-param-reassign
    zone.sprite.textureName = Markers.getDoorSpriteIcon(zone, zone.inside, authorized);
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
