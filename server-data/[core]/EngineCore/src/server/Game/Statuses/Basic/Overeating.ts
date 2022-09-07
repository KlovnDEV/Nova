/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Overeating extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: 'overeating',
      label: 'Переедание',
      description: `Желудок переполнен, вы чувствуете дискомфорт и не можете ничего есть. Ваша выносливость снижена.`,
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;

    if (values.hunger < -50) {
      newValue = 600; // 10 минут
    } else {
      newValue -= 1;
    }
    return clamp(newValue, 0, 600);
  }
}
