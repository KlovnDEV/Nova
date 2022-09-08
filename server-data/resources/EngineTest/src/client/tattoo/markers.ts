/* eslint-disable class-methods-use-this */
import { LocalPlayer, Ped } from '@nova/engine-lib/client/Game';
import { Blip, Marker } from '@nova/engine-lib/client/Graphics';
import { Vector3 } from '@nova/engine-lib/shared';

import Config from '../../config/tattoo';

export type ShopConfig = {
  coords: Vector3;
  ped: {
    coords: Vector3;
    instance: Ped;
  };

  player: {
    coords: Vector3;
    heading: number;
  };

  cameras: Record<
    string,
    {
      heading: number;
      angle: number;
      camOffset: number;
      zoomOffset: number;
    }
  >;
};

export class Markers {
  blips: Blip[] = [];
  markers: Marker[] = [];

  constructor(onPress: (shopConfig: ShopConfig) => void) {
    Object.values(Config.Shops).forEach(async (shopConfig: any) => {
      this.blips.push(this.createBlip(shopConfig));
      this.markers.push(this.createMarker(shopConfig, onPress));
    });
  }

  createBlip(shopConfig: ShopConfig): Blip {
    return new Blip({
      ...Config.Blip,
      ...shopConfig,
      coords: shopConfig.coords,
    });
  }

  createMarker(shopConfig: ShopConfig, onPress: (shopConfig: ShopConfig) => void): Marker {
    return new Marker({
      alpha: 0,
      coords: shopConfig.ped.coords,
      scale: new Vector3(3, 3, 3),
      notificationText: 'Нажми ~INPUT_PICKUP~ чтобы ~y~открыть ~w~меню',
      onPress: () => {
        onPress(shopConfig);
      },
    });
  }

  update() {
    this.markers.forEach(marker => {
      marker.draw();
    });
  }
}

export default Markers;
