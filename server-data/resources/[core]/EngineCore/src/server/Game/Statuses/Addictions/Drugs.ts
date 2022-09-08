/* eslint-disable class-methods-use-this */
import { clamp, Log } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Drugs extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'drugs',
      label: 'Наркотики',
      description: '',
      visible: Visibility.STATUS,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const addiction = values['drugs-addiction'] ?? 0;
    const minutesToShot = 120 - (addiction / 100.0) * 110.0;

    newValue -= 100.0 / (minutesToShot * 60);

    return clamp(newValue, 0, 200);
  }
}
