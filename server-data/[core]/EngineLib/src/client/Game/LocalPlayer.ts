import { SubscribeTarget } from '../../shared';
import { Vector3 } from '../../shared/Math';
import { ServerCallback } from '../Core';
import { Player } from './Player';

type RolesState = Record<string, { grade: number }>;
type MoneyState = Record<string, number>;
type StatusState = Record<string, number>;

export class LocalPlayerProto extends Player {

  static _roles: RolesState = {};
  static _money: MoneyState = {};
  static _status: StatusState = {};
  static _coords: Vector3 = new Vector3(0,0,0);

  constructor() {
    super(PlayerId().toString());
  }

  onMoneySet = new SubscribeTarget<[account: string, amount: number]>();
  onMoneyAdd = new SubscribeTarget<[account: string, amount: number, newValue: number]>();
  onMoneySub = new SubscribeTarget<[account: string, amount: number, newValue: number]>();

  revive(coords: Vector3 = this.ped.coords, heading = 0.0): void {
    this.ped.coords = new Vector3(coords.x, coords.y, coords.z);

    SetPlayerInvincible(this.handle, false);
    NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, heading, true, false);

    TriggerEvent('playerSpawned', coords.x, coords.y, coords.z);
    ClearPedBloodDamage(this.handle);
  }

  // Кэшированные параметры, не рушащие производительность вызовами API
  get coords(): Vector3 {
    return LocalPlayerProto._coords;
  }

  get roles(): RolesState {
    return LocalPlayerProto._roles;
  }

  get money(): MoneyState {
    return LocalPlayerProto._money;
  }

  get status(): StatusState {
    return LocalPlayerProto._status;
  }

  async pay(accounts: string[], amount: number, description: string, tax?: string): Promise<boolean> {
    return ServerCallback.Trigger('engine:pay', accounts, amount, description, tax) as unknown as Promise<boolean>;
  }
}

export const LocalPlayer = new LocalPlayerProto();

/* Кэшируем нужные поля state локального игрока, 
   чтобы к ним можно было обращаться в setTick
   без потери производительности, но с задержкой в 0.1 сек */
setInterval(() => {
  LocalPlayerProto._roles = LocalPlayer.state['roles'] || {};
  LocalPlayerProto._money = LocalPlayer.state['money'] || {};
  LocalPlayerProto._status = LocalPlayer.state['status'] || {};
}, 100)


onNet('engine:onPlayerMoneySet', (account, amount) => {
  LocalPlayer.onMoneySet.emit(account, amount);
})

onNet('engine:onPlayerMoneyAdd', (account, amount, newValue) => {
  LocalPlayer.onMoneyAdd.emit(account, amount, newValue);
})

onNet('engine:onPlayerMoneySub', (account, amount, newValue) => {
  LocalPlayer.onMoneySub.emit(account, amount, newValue);
})

setTick(() => {
  LocalPlayerProto._coords = LocalPlayer.ped.coords;
})