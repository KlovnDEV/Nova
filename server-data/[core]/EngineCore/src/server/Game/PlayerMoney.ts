import { assert, Log } from '@nova/engine-lib/shared';
import { Player, Players } from '@nova/engine-lib/server/Game';
import { ServerCallback } from 'server/Core/ServerCallback';
import { Inventory } from '@nova/engine-lib/server/Inventory';
import { DB } from '@nova/engine-lib/server/DB';

export class PlayerMoney {
  private player: Player;
  private accounts: Record<string, number> = {};

  private updateAccountState(name: string, amount: number) {
    this.accounts[name] = amount;
    this.player.state.set('money', this.accounts, true);
  }

  constructor(player: Player) {
    this.player = player;
    this.updateAccountState('bank', 0);
  }

  async getFromDB(account: string): Promise<number> {
    const { identifier } = this.player;
    return DB.Query('money/get', { name: account, identifier: identifier })
      .then(response => {
        assert(response.amount !== undefined, '1');
        // this.updateState(account, response.amount);
        return response.amount;
      })
      .catch(err => {
        // неинициализированный аккаунт (зануляем)
        if (err.status == 400) {
          console.warn(`Uninitialized money account: ${account}/${identifier}`);
          return 0;
        }

        throw err;
      });
  }

  async get(account: string): Promise<number> {
    if (this.player.state.money[account] !== undefined) return this.player.state.money[account];

    const value = await this.getFromDB(account);
    this.updateAccountState(account, value);

    return value;
  }

  async set(account: string, amount: number, description: string): Promise<void> {
    assert(amount >= 0, 'amount is negative!');

    const { identifier } = this.player;
    await DB.Query('money/set', { name: account, identifier: identifier, amount: amount });
    this.updateAccountState(account, amount);
    emit('engine:onPlayerMoneySet', this.player.handle, account, amount);
    Log.debug(`Money set ${this.player.identifier} on account ${account} to ${amount}: ${description}`);
  }

  async add(account: string, amount: number, description: string): Promise<number> {
    assert(amount >= 0, 'amount is negative!');

    const { identifier } = this.player;
    await DB.Query('money/add', { name: account, identifier: identifier, amount: amount });
    const newAmount = (await this.get(account)) + amount;
    this.updateAccountState(account, newAmount);
    emit('engine:onPlayerMoneyAdd', this.player.handle, account, amount, newAmount);
    Log.debug(
      `Money add ${this.player.identifier} on account ${account}, +${amount} (to ${newAmount}): ${description}`,
    );
    return newAmount;
  }

  async sub(account: string, amount: number, description: string): Promise<number> {
    assert(amount >= 0, 'amount is negative!');

    const { identifier } = this.player;
    const inventory = Inventory.ByPlayerIdentifier(identifier);

    if (account === 'cash') {
      if (!inventory) {
        throw new Error(`No inventory found!`);
      }

      if (!inventory.removeCash(amount)) {
        throw new Error(`Not enough cash!`);
      }

      Log.debug(`Money sub ${this.player.identifier} on cash, -${amount}: ${description}`);
      return 0; // FIXME
    }

    const newAmount = (await this.get(account)) - amount;
    if (newAmount < 0) throw new Error(`Not enough money!`);

    await DB.Query('money/remove', { name: account, identifier: identifier, amount: amount });
    this.updateAccountState(account, newAmount);
    emit('engine:onPlayerMoneySub', this.player.handle, account, amount, newAmount);

    Log.debug(
      `Money sub ${this.player.identifier} on account ${account}, -${amount} (to ${newAmount}): ${description}`,
    );

    return newAmount;
  }

  async pay(accounts: string[], amount: number, description: string, tax): Promise<boolean> {
    assert(amount >= 0, 'amount is negative!');

    for (const account of accounts) {
      // eslint-disable-next-line no-await-in-loop
      const newAmount = await this.sub(account, amount, description).catch(() => {
        return undefined;
      });

      if (newAmount !== undefined) {
        Log.debug(
          `Money pay ${this.player.identifier} on account ${account}, -${amount} (to ${newAmount}): ${description}`,
        );

        return true;
      }
    }

    return false;
  }
}

// Money events

on('engine:getPlayerMoney', async (handle, account, cb) => {
  const player = Players.ByHandle(handle);
  assert(player, '2');

  cb(await player.core.money.get(account));
});

on('engine:setPlayerMoney', async (handle, account, amount, description, cb) => {
  const player = Players.ByHandle(handle);
  assert(player, '3');

  await player.core.money.set(account, amount, description);
  cb(amount);
});

on('engine:addPlayerMoney', async (handle, account, amount, description, cb) => {
  const player = Players.ByHandle(handle);
  assert(player, '4');

  cb(await player.core.money.add(account, amount, description));
});

on('engine:subPlayerMoney', async (handle, account, amount, description, cb) => {
  const player = Players.ByHandle(handle);
  assert(player, '5');

  cb(await player.core.money.sub(account, amount, description));
});

on('engine:payPlayerMoney', async (handle, accounts: string[], amount: number, description: string, tax, cb) => {
  const player = Players.ByHandle(handle);
  assert(player, '6');

  cb(await player.core.money.pay(accounts, amount, description, tax));
});

ServerCallback.Register(
  'engine:pay',
  async (source: number, accounts: string[], amount: number, description: string, tax: string) => {
    const player = Players.ByHandle(source);
    return player.core.money
      .pay(accounts, amount, description, tax)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  },
);
