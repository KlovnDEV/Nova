import Markers, { ConfigZone } from './markers';

let markerWorked = false;

const markers = new Markers((zone: ConfigZone) => {
  if (markerWorked) return;
  markerWorked = true;

  emitNet('inventory:openInventories', [
    { category: zone.category, identifier: zone.identifier },
    { category: 'player-inventory' },
  ]);
});

setTick(async () => {
  markerWorked = false;
  markers.draw();
});
