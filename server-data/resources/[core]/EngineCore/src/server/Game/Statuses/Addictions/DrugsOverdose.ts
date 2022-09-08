/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class DrugsOverdose extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'drugs-overdose',
      label: 'Передозировка наркотиками',
      description: 'Опасное для жизни состояние',
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const { drugs } = values;

    if (drugs > 190) {
      newValue = 100.0;
    } else {
      newValue = 0.0;
    }

    return clamp(newValue, 0, 100);
  }
}
