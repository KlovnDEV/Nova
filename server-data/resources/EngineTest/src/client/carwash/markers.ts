import { Blip, Marker } from '@nova/engine-lib/client/Graphics';
import { Vector3 } from '@nova/engine-lib/shared';

import Config from '../../config/carwash';

class Markers {
  private onPress = () => {};
  private blips: Blip[] = [];
  private markers: Marker[] = [];

  constructor(onPress: () => void) {
    this.onPress = onPress;
    Config.Locations.forEach(coords => {
      this.createBlip(coords);
      this.createMarker(coords);
    });
  }

  createBlip(coords: Vector3): void {
    const blip = new Blip({
      coords,
      sprite: 100,
      text: 'Автомойка',
    });

    this.blips.push(blip);
  }

  createMarker(coords: Vector3): void {
    const marker = new Marker({
      coords,
      scale: new Vector3(5, 5, 2),
      notificationText: `Нажмите ~INPUT_CONTEXT~ чтобы помыть машину за ~g~$${Config.Price}~s~`,
      onPress: this.onPress,
    });

    this.markers.push(marker);
  }

  draw(): void {
    this.markers.forEach(marker => {
      marker.draw();
    });
  }
}

export default Markers;
