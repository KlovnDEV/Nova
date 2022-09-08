/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Stress extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'stress',
      label: 'Стресс',
      description: `Снижает обучаемость и производительность труда`,
      visible: Visibility.STATUS,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;

    // Стресс накапливается при неудовлетворённой зависимости
    if (values['smoking-addiction'] > 10.0 && values.smoking < 1.0) {
      return newValue + values['alcohol-addiction'] * 0.005;
    }

    if (values['alcohol-addiction'] > 10.0 && values.alcohol < 1.0) {
      return newValue + values['alcohol-addiction'] * 0.0025;
    }

    if (values['drugs-addiction'] > 10.0 && values.drugs < 1.0) {
      return newValue + values['alcohol-addiction'] * 0.01;
    }

    if (values['hunger-low'] > 10.0 || values['hunger-high'] > 10.0 || values.overeating > 1.0 || values.thirst > 90) {
      return newValue + 0.1;
    }

    newValue -= 100.0 / (60 * 60); // восполняется за 60 минут

    return clamp(newValue, 0, 100);
  }

  get name(): string {
    return 'stress';
  }

  get label(): string {
    return 'Стресс';
  }

  get description(): string {
    return 'Снижает выносливость и производительность труда';
  }
}
