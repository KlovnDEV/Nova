/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class ThirstHigh extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'thirst-high',
      label: 'Обезвоживание',
      description: `Вы невыносимо хотите пить, выша выносливость сильно снижена`,
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const thirst = values.thirst ?? 0;

    if (thirst > 80) {
      newValue += 100.0 / (30 * 60); // заполняется за 30 минут, если предыдущая фаза на высоком уровне
    } else {
      newValue -= 10; // Быстро убираем обезвоживание после питья
    }

    return clamp(newValue, 0, 100);
  }
}
