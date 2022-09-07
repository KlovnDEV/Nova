/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class PainHigh extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: `pain-high`,
      label: `Сильная боль`,
      description: 'Следует обратиться к врачу!',
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;

    if (values.pain > 80.0) newValue = 10;

    newValue -= 1;

    return clamp(newValue, 0, 10);
  }
}
