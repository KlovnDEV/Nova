import { SubscribeTarget } from '../../shared';
import { Player } from './Player';

export class PlayerMoney {
  private player: Player;
  private resName = GetCurrentResourceName();

  constructor(player: Player) {
    this.player = player;
  }

  readonly onSet = new SubscribeTarget<[account: string, amount: number]>();
  readonly onAdd = new SubscribeTarget<[account: string, amount: number, newValue: number]>();
  readonly onSub = new SubscribeTarget<[account: string, amount: number, newValue: number]>();

  async get(account: string) {
    return new Promise<number>(resolve => {
      emit('engine:getPlayerMoney', this.player.handle, account, amount => {
        resolve(amount);
      });
    });
  }

  async set(account: string, amount: number, description: string = this.resName) {
    return new Promise<void>(resolve => {
      emit('engine:setPlayerMoney', this.player.handle, account, amount, description, () => {
        resolve();
      });
    });
  }

  async add(account: string, amount: number, description: string = this.resName) {
    return new Promise<void>(resolve => {
      emit('engine:addPlayerMoney', this.player.handle, account, amount, description, () => {
        resolve();
      });
    });
  }

  async sub(account: string, amount: number, description: string = this.resName) {
    return new Promise<void>(resolve => {
      emit('engine:subPlayerMoney', this.player.handle, account, amount, description, () => {
        resolve();
      });
    });
  }

  async pay(accounts: string[], amount: number, description: string = this.resName, tax?: string) {
    return new Promise<void>((resolve, reject) => {
      emit('engine:payPlayerMoney', this.player.handle, accounts, amount, description, tax, (success) => {
        if (success) resolve();
        else reject();
      });
    })
  }
}
