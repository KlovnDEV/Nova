import { ServerCallback } from '@nova/engine-lib/server/Core';
import { Player, Players, Entity } from '@nova/engine-lib/server/Game';
import { showNotification } from '@nova/engine-lib/server/UI';
import { assert, Delay, Log } from '@nova/engine-lib/shared';
import Config from '../../config/jobs-oil';
import { Liquid } from './liquid';

let oilStore = 0;
let gasStore = 100000;

setTick(async () => {
  await Delay(1000);
  if (oilStore >= 3) {
    oilStore -= 3;
    gasStore += 1;
  }

  Config.Zones.forEach(zone => {
    if (zone.type == 'extract' && zone.store.current < zone.store.max) {
      zone.store.current += 1;
    }
  });
});

function RefuelTanker(player: Player, tanker: Entity, name: string, amount: number): boolean {
  assert(name);
  assert(amount > 0);

  const liquidData = new Liquid(tanker.state, 11000);

  if (liquidData.add(name, amount)) {
    showNotification(player, `Заправка ${name}: ${tanker.state.liquid.amount} из ${Config.TankerCapacity}`);
    return true;
  }

  return false;
}

function storeFromZone(zoneId, amount: number) {
  const zone = Config.Zones[zoneId];

  assert(zone);
  assert(amount > 0);

  if (zone.store.current < amount) {
    return false;
  }

  zone.store.current -= amount;

  return true;
}

function storeFromTanker(player: Player, tanker: Entity, liquid, amount) {
  const liquidData = new Liquid(tanker.state, 11000);

  if (!liquidData.has(liquid)) {
    if (liquid == 'oil') {
      showNotification(player, 'В цистерне нет нефти!');
    } else if (liquid == 'gas') {
      showNotification(player, 'В цистерне нет бензина!');
    } else {
      showNotification(player, `В цистерне нет: ${liquid}!`);
    }

    return false;
  }

  return liquidData.sub(liquid, amount);
}

function getEntityFromNetid(netid): Entity {
  const entity = NetworkGetEntityFromNetworkId(netid);
  return new Entity(entity);
}

function insideExtract(player: Player, entity: Entity) {
  RefuelTanker(player, entity, 'oil', 1);
}

function insideStore(player: Player, entity: Entity) {
  if (oilStore > Config.OilStoreCapacity) {
    return;
  }

  if (storeFromTanker(player, entity, 'oil', 1)) {
    oilStore += 1;
  }
}

function insideGasStore(player: Player, entity: Entity, zoneId) {
  if (storeFromZone(zoneId, 1) && RefuelTanker(player, entity, 'gas', 1)) {
    // FIXME
  }
}

function findGasStation(brand: string, index: number) {
  for (const v of Object.values<{
    brand: string;
    index: number;
    type: string;
    store: { current: number; max: number };
  }>(Config.Zones)) {
    if (v.type == 'gas-station') {
      if (v.brand == brand && v.index == index) {
        return v;
      }
    }
  }

  return null;
}

function insideGasStation(player: Player, entity: Entity, brand: string, index: number) {
  const zone = findGasStation(brand, index);

  if (zone.store.current >= zone.store.max) {
    return;
  }

  if (storeFromTanker(player, entity, 'gas', 1)) {
    zone.store.current += 1;
    emitNet('nova-ui:updateGasStation', player.handle, brand, index);
  }
}

onNet('jobs-oil:insideMarker', function (netid: number, zoneId: number, data: any) {
  const player = Players.ByHandle(source);
  const vehicle = getEntityFromNetid(netid);
  const zone = Config.Zones[zoneId];

  if (!vehicle.exist) return;

  Log.debug(zone.type, vehicle.state.liquid);

  if (zone.type == 'extract') {
    insideExtract(player, vehicle);
  } else if (zone.type == 'store') {
    insideStore(player, vehicle);
  } else if (zone.type == 'gas-store') {
    insideGasStore(player, vehicle, zoneId);
  } else if (zone.type == 'gas-station' && data) {
    insideGasStation(player, vehicle, data.brand, data.index);
  }
});

onNet('jobs-oil:insideGasStation', function (netid: number, brand: string, index: number) {
  const player = Players.ByHandle(source);
  const entity = getEntityFromNetid(netid);
  if (!entity.exist) return;

  insideGasStation(player, entity, brand, index);
});

ServerCallback.Register('jobs-oil:getGasStationData', function (handle: number, brand, index) {
  const station = findGasStation(brand, index);
  return station;
});

ServerCallback.Register('jobs-oil:getZone', function (handle: number, zoneId) {
  const zone = Config.Zones[zoneId];
  return zone;
});
