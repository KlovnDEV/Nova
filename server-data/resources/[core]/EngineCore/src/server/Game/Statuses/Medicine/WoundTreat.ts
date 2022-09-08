/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { Player } from '@nova/engine-lib/server/Game';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Bleed extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: `bleed`,
      label: `Кровотечение`,
      description: 'Вы теряете кровь. Обработайте раны, чтобы избежать заражения и снизить кровопотерю.',
      visible: Visibility.BUFF,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    if (!value) return 0;

    let newValue = value;

    // самое сильное кровотечение длится 10 часов
    newValue -= 100.0 / (10 * 60 * 60);

    return clamp(newValue, 0, 100);
  }
}
