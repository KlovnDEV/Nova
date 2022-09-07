/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class BrainConcussion extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: `trauma-concussion`,
      label: `Сотрясение мозга`,
      description: '',
      visible: Visibility.NONE,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    if (!value) return 0;

    let newValue = value ?? 0;
    newValue -= 1;

    return clamp(newValue, 0, 10 * 60 * 60); // не может длиться более 10 часов
  }
}
