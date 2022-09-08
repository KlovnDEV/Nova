import { ServerCallback } from '@nova/engine-lib/client/Core';
import { LocalPlayer, Vehicle, Vehicles } from '@nova/engine-lib/client/Game';
import { showNotification } from '@nova/engine-lib/client/UI';
import { Delay, Log } from '@nova/engine-lib/shared';
import Markers, { ConfigZone } from './markers';

async function onMarkerPress(zone: ConfigZone) {
  if (zone.type == 'gas-station') {
    emit('nova-ui:showGasStation', zone);
  } else {
    const serverZone = await ServerCallback.Trigger('jobs-oil:getZone', zone.id);
    if (serverZone) {
      showNotification(`Хранилище ${serverZone.store.current}/${serverZone.store.max}`);
    }
  }
}

const markers = new Markers(onMarkerPress);
const tankerHash = GetHashKey('tanker');

setTick(async () => {
  markers.draw();
});

setTick(async () => {
  await Delay(1000);

  const veh = LocalPlayer.ped.vehicle;
  if (!veh.exist) return;

  const [isTrailed, trailedHandle] = GetVehicleTrailerVehicle(veh.handle);
  if (!isTrailed) return;

  const tanker = new Vehicle(trailedHandle);
  if (tanker.model != GetHashKey('tanker')) return;

  const { liquid } = tanker.state;
  if (liquid && liquid.amount > 0) {
    SetVehicleUnkDamageMultiplier(tanker.handle, 1);
    SetVehicleCanLeakPetrol(tanker.handle, true);
    SetVehicleCanLeakOil(tanker.handle, true);
  } else {
    SetVehicleUnkDamageMultiplier(tanker.handle, 0.1);
    SetVehicleCanLeakPetrol(tanker.handle, false);
    SetVehicleCanLeakOil(tanker.handle, false);
  }

  if (markers.insideZone) {
    if (veh.exist && tanker.exist) {
      const netid = tanker.networkId;
      if (NetworkDoesNetworkIdExist(netid)) {
        emitNet('jobs-oil:insideMarker', netid, markers.insideZone.id);
      }
    }
  }
});
