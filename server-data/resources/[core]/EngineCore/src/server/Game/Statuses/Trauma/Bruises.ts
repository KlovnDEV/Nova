/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { Player } from '@nova/engine-lib/server/Game';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Bruises extends PlayerStatus {
  private limb: string;
  private limbLabel: string;

  constructor(player: Player, limb: string, limbLabel: string) {
    super(player);
    this.limb = limb;
    this.limbLabel = limbLabel;
  }

  get info(): PlayerStatusInfo {
    return {
      name: `trauma-bruises-${this.limb}`,
      label: `Ушибы и ссадины ${this.limbLabel}`,
      description: '',
      visible: Visibility.NONE,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    if (!value) return 0;

    let newValue = value ?? 0;
    newValue -= 1;

    return clamp(newValue, 0, 2 * 60 * 60); // не может длиться более 2 часов
  }
}
