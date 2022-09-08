/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class HungerHigh extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'hunger-high',
      label: 'Истощение',
      description: `Вы буквально умираете от голода. Физические показатели сильно снижены, 
        сложно сосредоточиться на изучении или набирать мышечную массу`,
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const hungerLow = values['hunger-low'] ?? 0;

    if (hungerLow > 80) {
      newValue += 100.0 / (30 * 60); // заполняется за 30 минут, если предыдущая фаза на высоком уровне
    } else {
      newValue -= 10; // Быстро убираем голод после еды
    }

    // if (newValue > 80.0) {
    //   this.player.health -= 1;
    // }

    return clamp(newValue, 0, 100);
  }
}
