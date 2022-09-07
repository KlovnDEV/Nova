/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class DrugsAddiction extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'drugs-addiction',
      label: 'Наркотическая зависимость',
      description: 'Выраженность абстинентного синдрома',
      visible: Visibility.NONE,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;

    if (values.smoking > 30) {
      newValue += 100.0 / (6 * 60 * 60); // зависимость наполняется в течение 6 игровых часов
    } else {
      newValue -= 100.0 / (12 * 60 * 60); // и проходит в течение 12 часов
    }

    return clamp(newValue, 0, 100);
  }
}
