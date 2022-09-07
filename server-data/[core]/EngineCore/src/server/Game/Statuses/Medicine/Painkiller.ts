/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { Player } from '@nova/engine-lib/server/Game';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Painkiller extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: `medicine-painkiller`,
      label: `Обезболивание`,
      description: 'Болевые ощущения притуплены обезболивающим препаратом.',
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    if (!value) return 0;

    let newValue = value;

    // длится 1 час
    newValue -= 100.0 / (1 * 60 * 60);

    return clamp(newValue, 0, 100);
  }
}
