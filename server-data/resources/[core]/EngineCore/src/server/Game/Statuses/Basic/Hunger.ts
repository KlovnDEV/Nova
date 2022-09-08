/* eslint-disable class-methods-use-this */
import { clamp, Log } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Hunger extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'hunger',
      label: 'Голод',
      description: 'Базовый показатель голода. При достижении 100 вешаем первый дебафф',
      visible: Visibility.STATUS,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const overeatingMultiplier = value < 0 ? 2 : 1; // лишняя съеденная еда расходуется в два раза быстрее

    newValue += (overeatingMultiplier * 100.0) / (30 * 60); // заполняется за 30 минут

    return clamp(newValue, -100, 100);
  }
}
