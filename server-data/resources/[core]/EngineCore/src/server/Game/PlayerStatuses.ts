import { DB } from '@nova/engine-lib/server/DB';
import { Player, Players } from '@nova/engine-lib/server/Game';
import { assert } from '@nova/engine-lib/shared';
import { PlayerStatus, Visibility } from './PlayerStatus';

import {
  Hunger,
  HungerLow,
  HungerHigh,
  Overeating,
  Thirst,
  ThirstHigh,
  Alcohol,
  AlcoholAddiction,
  Smoking,
  SmokingAddiction,
  Drugs,
  DrugsAddiction,
  Stress,
  Strength,
  Agility,
  Endurance,
  Intelligence,
} from './Statuses';
import { BoneFracture, BrainConcussion, Bruises, Dislocation, KnifeCut, Pain, ShotBullet } from './Statuses/Trauma';
import { PainHigh } from './Statuses/Trauma/PainHigh';

type TBuffInfo = {
  startTime: number;
  label: string;
  description: string;
};

export class PlayerStatuses {
  private player: Player;
  private statuses: Record<string, PlayerStatus> = {};
  values: Record<string, number> = {};

  constructor(player: Player) {
    this.player = player;
    this.player.state.set('status', {}, true);

    DB.Query('status/get', { identifier: player.identifier })
      .then(res => {
        if (res.length > 0) {
          this.values = JSON.parse(res[0].value);
        }
      })
      .catch(err => {
        // cannot be fatal in constructor
        console.error(err);
      });

    // базовые
    [Hunger, HungerLow, HungerHigh, Overeating, Thirst, ThirstHigh, Stress].forEach(St => this.push(new St(player)));

    // зависимости
    [Alcohol, AlcoholAddiction, Smoking, SmokingAddiction, Drugs, DrugsAddiction].forEach(St =>
      this.push(new St(player)),
    );

    // скиллы
    [Strength, Agility, Endurance, Intelligence].forEach(St => this.push(new St(player)));

    const limbs = [
      ['larm', 'левой руки'],
      ['rarm', 'правой руки'],
      ['lleg', 'левой ноги'],
      ['rleg', 'правой ноги'],
    ];

    for (const [name, label] of limbs) {
      this.push(new BoneFracture(player, name, label));
      this.push(new Dislocation(player, name, label));
      this.push(new Bruises(player, name, label));
      this.push(new KnifeCut(player, name, label));
      this.push(new ShotBullet(player, name, label));
    }

    this.push(new KnifeCut(player, 'torso', 'грудной клетки'));
    this.push(new ShotBullet(player, 'torso', 'грудной клетки'));
    this.push(new ShotBullet(player, 'head', 'шеи'));

    this.push(new BoneFracture(player, 'torso', 'ребра'));
    this.push(new Bruises(player, 'torso', '(торс)'));
    this.push(new Bruises(player, 'head', '(голова)'));

    this.push(new BrainConcussion(player));

    this.push(new Pain(player));
    this.push(new PainHigh(player));
  }

  tick(): void {
    const buffs: Record<string, TBuffInfo> = {};

    const { health } = this.player.state;
    if (health !== undefined) {
      this.values.health = 1 + health;
    }

    Object.entries(this.statuses).forEach(([key, status], index) => {
      const value = status.tick(this.values[key], this.values);
      this.values[key] = value;

      const { info } = status;
      if (this.values[key] > 0 && info.visible == Visibility.BUFF) {
        buffs[info.name] = { startTime: index, label: info.label, description: info.description };
      }
    });

    this.player.state.set('status', this.values, true);

    // примитивный вариант deep compare, чтобы не отправлять лишние данные
    if (JSON.stringify(this.player.state.buffs) != JSON.stringify(buffs)) {
      this.player.state.set('buffs', buffs, true);
    }

    // Log.debug(this.filteredValues);
  }

  push(status: PlayerStatus): void {
    this.statuses[status.info.name] = status;
  }

  add(name: string, amount: number): void {
    if (amount < 0) throw new Error('negative value status amount');
    if (this.values[name] === undefined) throw new Error(`Unknown status: ${name}`);

    this.values[name] += amount;
  }

  sub(name: string, amount: number): void {
    if (amount < 0) throw new Error('negative value status amount');
    if (this.values[name] === undefined) throw new Error(`Unknown status: ${name}`);

    this.values[name] -= amount;
  }

  set(name: string, amount: number): void {
    if (amount < 0) throw new Error('negative value status amount');
    if (this.values[name] === undefined) throw new Error(`Unknown status: ${name}`);

    this.values[name] = amount;
  }

  start(name: string, ...args: Array<any>): void {
    assert(this.values[name] !== undefined, `Unknown status: ${name}`);

    assert(this.statuses[name]);
    this.statuses[name].start(this.values, ...args);
  }

  stop(name: string, ...args: Array<any>): void {
    assert(this.values[name] !== undefined, `Unknown status: ${name}`);

    assert(this.statuses[name]);
    this.statuses[name].stop(this.values, ...args);
  }

  get filteredValues(): Record<string, number> {
    const filteredValues = {};
    for (const [k, v] of Object.entries(this.values)) {
      if (v) filteredValues[k] = +v.toFixed(2);
    }

    return filteredValues;
  }

  // info(): Record<string, PlayerStatusInfo> {
  //   const info: Record<string, PlayerStatusInfo> = {};

  //   for (const [key, val] of Object.entries(this.statuses)) {
  //     info[key] = val.info;
  //   }

  //   return info;
  // }

  // get(statusName: string): PlayerStatus {
  //   for (const status of Object.values(this.statuses)) {
  //     if (status.name == statusName) {
  //       return status;
  //     }
  //   }

  //   return null;
  // }
}

on('engine:status:add', (handle: number, name: string, amount: number) => {
  const player = Players.ByHandle(handle);
  assert(player);
  player.core.status.add(name, amount);
});

on('engine:status:sub', (handle: number, name: string, amount: number) => {
  const player = Players.ByHandle(handle);
  assert(player);
  player.core.status.sub(name, amount);
});

on('engine:status:set', (handle: number, name: string, amount: number) => {
  const player = Players.ByHandle(handle);
  assert(player);
  player.core.status.set(name, amount);
});

on('engine:status:start', (handle: number, name: string, ...args) => {
  const player = Players.ByHandle(handle);
  assert(player);
  player.core.status.start(name, ...args);
});

on('engine:status:stop', (handle: number, name: string, ...args) => {
  const player = Players.ByHandle(handle);
  assert(player);
  player.core.status.stop(name, ...args);
});
