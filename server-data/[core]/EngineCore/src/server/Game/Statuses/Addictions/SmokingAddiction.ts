/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class SmokingAddiction extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'smoking-addiction',
      label: 'Никотиновая зависимость',
      description: '',
      visible: Visibility.NONE,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const smoking = values.smoking ?? 0;

    if (smoking > 30) {
      newValue += 100.0 / (6 * 60 * 60); // зависимость наполняется в течение 6 игровых часов
    } else {
      newValue -= 100.0 / (12 * 60 * 60); // и проходит в течение 12 часов
    }

    return clamp(newValue, 0, 100);
  }

  get name(): string {
    return 'smoking-addiction';
  }

  get label(): string {
    return 'Никотиновая зависимость';
  }

  get description(): string {
    return '.';
  }
}
