/* eslint-disable class-methods-use-this */
import { clamp, Log } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Thirst extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'thirst',
      label: 'Жажда',
      description: `Определяет, насколько игрок хочет пить`,
      visible: Visibility.STATUS,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const overdrinkingMultiplier = value < 0 ? 2 : 1; // лишняя выпитая вода расходуется в два раза быстрее

    newValue += (overdrinkingMultiplier * 100.0) / (50 * 60); // заполняется за 50 минут

    return clamp(newValue, -100, 100);
  }
}
