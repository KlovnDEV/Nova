import { SubscribeTarget } from '../../shared';
import { Player } from './Player';

export type PlayerRole = {
  grade: number
}

export class PlayerRoles {
  private player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  readonly onChange = new SubscribeTarget<[name: string, roles: Record<string, PlayerRole>]>();

  all(): Record<string, PlayerRole> {
    return this.player.state['roles'] || {};
  }

  get(role: string): PlayerRole {
    return this.all()[role];
  }

  has(role: string): boolean {
    return !!this.get(role);
  }

  set(name: string, grade: number) {
    const roles = this.all();
    roles[name] = { grade };
    this.player.state['roles'] = roles;
    this.onChange.emit(name, roles);
  }

  remove(name: string) {
    const roles = this.all();
    delete roles[name];
    this.player.state['roles'] = roles;
    this.onChange.emit(name, roles);
  }
}
