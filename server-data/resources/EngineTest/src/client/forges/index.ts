/* Не проверено */
import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Log } from '@nova/engine-lib/shared';

import Markers, { ConfigZone } from './markers';

let markerWorked = false;

const markers = new Markers((zone: ConfigZone) => {
  if (markerWorked) return;
  markerWorked = true;

  Log.debug('Press forge', zone.title);
  emit('nova-ui:showCraft', 'craft', zone.identifier, zone.categories);
});

setTick(async () => {
  markerWorked = false;
  markers.draw();
});
