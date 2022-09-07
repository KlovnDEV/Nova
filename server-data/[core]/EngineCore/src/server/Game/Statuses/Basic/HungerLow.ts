/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class HungerLow extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'hunger-low',
      label: 'Голод',
      description: `Вы проголодались. Мешает сосредоточиться, физические показатели снижены, сложнее набирать мышечную массу`,
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;
    const hunger = values.hunger ?? 0;

    if (hunger > 80) {
      newValue += 100.0 / (30 * 60); // заполняется за 30 минут, если предыдущая фаза на высоком уровне
    } else {
      newValue -= 10; // Быстро убираем голод после еды
    }
    return clamp(newValue, 0, 100);
  }
}
