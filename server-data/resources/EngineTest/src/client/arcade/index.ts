/* Нет менюшки */
import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Blip } from '@nova/engine-lib/client/Graphics';
import { Log, Vector3 } from '@nova/engine-lib/shared';

const blips: Blip[] = [];
blips.push(
  new Blip({
    sprite: 740,
    color: 83,
    coords: new Vector3(756.25, -816.23, 26.52),
  }),
);
