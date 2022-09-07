/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Player } from '@nova/engine-lib/server/Game';

export enum Visibility {
  NONE = 0,
  STATUS = 1,
  BUFF = 2,
  SKILL = 3,
}

export type PlayerStatusInfo = {
  name: string;
  label: string;
  description: string;
  visible: Visibility;
};
export abstract class PlayerStatus {
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  start(values: Record<string, number>, ...args: Array<any>): void {}
  stop(values: Record<string, number>, ...args: Array<any>): void {}

  abstract tick(value: number, values: Record<string, number>): number;
  abstract get info(): PlayerStatusInfo;
}
