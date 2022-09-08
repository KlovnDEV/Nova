import { DB } from '@nova/engine-lib/server/DB';
import { Player, Players } from '@nova/engine-lib/server/Game';

export class PlayerIdentity {
  private player: Player;
  private identity;

  constructor(player: Player) {
    this.player = player;
    this.GetFromDB().then(response => {
      this.player.state.set('identity', response, true);
    });
  }

  async GetFromDB() {
    return DB.Query('identity/get', { identifier: this.player.identifier }).then(response => {
      this.identity = response;
    });
  }

  async Get() {
    if (this.identity) return this.identity;

    await this.GetFromDB();
    return this.identity;
  }

  async Set(data: Record<string, any>) {
    const newIdentity = { identifier: this.player.identifier, ...data };
    return DB.Query('identity/update', { identifier: this.player.identifier, ...data }).then(() => {
      this.identity = newIdentity;
      this.player.state.identity = newIdentity;
    });
  }
}

on('engine:setPlayerIdentity', (handle, value) => {
  const player = Players.ByHandle(handle);
  if (!player) return;

  player.identity.Set(value);
});
