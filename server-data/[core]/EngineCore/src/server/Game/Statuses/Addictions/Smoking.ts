/* eslint-disable class-methods-use-this */
import { clamp, Log } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Smoking extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'smoking',
      label: 'Курение',
      description: '',
      visible: Visibility.STATUS,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const addiction = values['smoking-addiction'] ?? 0;
    const minutesToSmoke = 100 - (addiction / 100.0) * 80.0;

    newValue -= 100.0 / (minutesToSmoke * 60);

    return clamp(newValue, 0, 100);
  }
}
