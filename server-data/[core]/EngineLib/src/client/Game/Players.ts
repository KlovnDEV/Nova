import { Player } from './Player';

export class Players {
  static All(): Player[] {
    return GetActivePlayers().map((handle) => new Player(handle));
  }
}