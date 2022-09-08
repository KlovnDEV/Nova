/* eslint-disable no-param-reassign */
import { Marker, Sprite, Blip } from '@nova/engine-lib/client/Graphics';
import { Delay, Vector2, Vector3 } from '@nova/engine-lib/shared';

import Config from '../../config/atm';
import State from './State';

import { showBank, hideBank } from './ui';

// Configure markers, sprites, blips
Config.Zones.forEach((zone, index) => {
  zone.sprite = new Sprite({
    coords: zone.Position,
    scale: new Vector2(0.1, 0.1),
    textureDict: 'spritedict',
    textureName: 'locker',
    alpha: 255,
    color: [255, 255, 255],
    drawDistance: 5.0,
    // distanceFade: false,
  });

  zone.marker = new Marker({
    markerType: 1,
    coords: zone.Position,
    color: [55, 100, 255],
    scale: Vector3.FromArray([2, 2, 1]),
    drawDistance: zone.DrawDistance || 20.0,
    notificationText: 'Нажмите ~INPUT_PICKUP~ для доступа к банку',

    onPress: () => {
      showBank(zone);
    },
    onEnter: () => {
      // zone.sprite.textureName = 'locker_e';
      State.ATMEntity = null;
      State.BankZone = zone;
    },
    onExit: () => {
      // zone.sprite.textureName = 'locker';
      hideBank();
      // ESX.SetPlayerData('inventory_current_container', nil)
    },
  });

  const blip = new Blip({
    coords: zone.Position,
    sprite: 108,
    display: 4,
    scale: 0.7,
    color: 30,
    shortRange: true,
    text: 'Банк',
  });

  zone.blip = blip;
  zone.id = index;
});

// Draw
Delay(1000).then(() =>
  setTick(async () => {
    Config.Zones.forEach((zone: { marker: Marker; sprite: Sprite }) => {
      zone.marker.draw();
      zone.sprite.draw();
    });
  }),
);
