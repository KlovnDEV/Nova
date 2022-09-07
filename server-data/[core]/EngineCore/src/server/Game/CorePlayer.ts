import { ClientCallback } from 'server/Core/ClientCallback';
import { Delay, Log, promiseTimeout, Vector3 } from '@nova/engine-lib/shared';
import { DB } from '@nova/engine-lib/server/DB';
import { Player, Players, getPlayerIdentifiers, getUniqueIdentifier } from '@nova/engine-lib/server/Game';
import { PlayerIdentity } from './PlayerIdentity';
import { PlayerMoney } from './PlayerMoney';
import { PlayerStatuses } from './PlayerStatuses';

export class CorePlayer {
  private player: Player;
  lastCoords: Vector3 = null;
  money: PlayerMoney;
  identity: PlayerIdentity;
  status: PlayerStatuses;

  constructor(player: Player) {
    player.state.set('identifier', player.identifier, true);
    if (!player.state.roles) player.state.roles = {};

    this.player = player;
    this.identity = new PlayerIdentity(player);
    this.money = new PlayerMoney(player);
    this.status = new PlayerStatuses(player);
  }

  get coords(): Vector3 | null {
    const c = this.player.state.coords;
    if (!c) return null;
    return Vector3.FromArray(c);
  }

  set coords(value: Vector3) {
    promiseTimeout(ClientCallback.Trigger(this.player, 'engine:teleport', value));
  }

  public get health(): number {
    const ped = GetPlayerPed(`${this.player.handle}`);
    const health = GetEntityHealth(ped);
    if (health < 100) return 0;
    return health - 100;
  }

  public set health(health: number) {
    promiseTimeout(ClientCallback.Trigger(this.player, 'engine:setHealth', health));
  }

  revive(): void {
    promiseTimeout(ClientCallback.Trigger(this.player, 'engine:revive'));
  }
}

Players.onJoin.subscribe(player => {
  const cplayer = new CorePlayer(player);
  Object.assign(player, {
    core: cplayer,
  });

  DB.Query('users/join', { identifier: player.identifier });
});

Players.onDrop.subscribe(player => {
  DB.Query('users/drop', { identifier: player.identifier });
});

on('playerConnecting', async function (name, setCallback, deferrals) {
  deferrals.defer();

  const playerHandle = source;
  await Delay(100);

  const identifiers = getPlayerIdentifiers(String(playerHandle));
  getUniqueIdentifier(identifiers)
    .then(identifier => {
      Log.info('Player connecting', playerHandle, identifier, 'success');
      deferrals.done();
    })
    .catch(() => {
      deferrals.done('Unable to load character! Cannot find proper identifier.');
    });
});

setTick(async () => {
  await Delay(3000);

  Players.All().forEach(player => {
    const core = player.core as CorePlayer;

    core.status.tick();
    const values = { ...core.status.values };
    Object.entries(values).forEach(([key, val]: [string, number]) => {
      values[key] = Math.floor(val * 10.0) / 10.0;
    });

    // записываем текущие координаты игрока в базу для статистики
    // if (core.lastCoords && core.coords.distanceTo(core.lastCoords) >= 3.0) {
    if (core.coords) {
      DB.Query('stats/player/set', {
        identifier: player.identifier,
        coords: core.coords.toArray(),
        status: JSON.stringify(core.status.filteredValues),
      });
    }
    //   core.lastCoords = player.core.coords;
    // } else if (!core.lastCoords) {
    //   core.lastCoords = player.core.coords;
    // }
    // Log.info(values);
  });
});

// записываем статусы в базу
setTick(async () => {
  await Delay(60000);
  Players.All().forEach(player => {
    const core = player.core as CorePlayer;

    DB.Query('status/set', { identifier: player.identifier, value: JSON.stringify(core.status.filteredValues) }).catch(
      err => {
        console.error(err);
      },
    );
  });
});

// Сбрасываем статусы подключения при запуске
DB.Query('users/drop', {});

Players.All().forEach(player => {
  DB.Query('users/join', { identifier: player.identifier });
});
