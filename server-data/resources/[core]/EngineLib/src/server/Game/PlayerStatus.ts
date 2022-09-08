import { assert } from '../../shared';
import { SubscribeTarget } from '../../shared';
import { Player } from './Player';

export class PlayerStatus {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  set(name: string, value: number) {
    emit('engine:status:set', this.player.handle, name, value);
  }

  add(name: string, value: number) {
    assert(value > 0);
    emit('engine:status:add', this.player.handle, name, value);
  }

  sub(name: string, value: number) {
    assert(value > 0);
    emit('engine:status:add', this.player.handle, name, value);
  }
}
