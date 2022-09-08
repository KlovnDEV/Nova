/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Alcohol extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'alcohol',
      label: 'Алкогольное опьянение',
      description: 'Насколько пьяным вы себя ощущаете в данный момент (0 - трезв)',
      visible: Visibility.STATUS,
    };
  }

  tick(value: number): number {
    let newValue = value ?? 0;
    newValue -= 100.0 / (30 * 60); // серьёзное опьянение проходит через 30 минут

    return clamp(newValue, 0, 100);
  }
}
