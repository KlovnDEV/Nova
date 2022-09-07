/* eslint-disable class-methods-use-this */
import { clamp } from '@nova/engine-lib/shared';
import { Player } from '@nova/engine-lib/server/Game';
import { PlayerStatus, PlayerStatusInfo, Visibility } from '../../PlayerStatus';

export class Pain extends PlayerStatus {
  get info(): PlayerStatusInfo {
    return {
      name: `pain`,
      label: `Боль`,
      description: '',
      visible: Visibility.NONE,
    };
  }

  tick(value: number, values: Record<string, number>): number {
    let newValue = value ?? 0;

    for (const [key, val] of Object.entries(values)) {
      if (val > 1.0) {
        if (key.startsWith('trauma-fracture-')) newValue += 0.7;
        if (key.startsWith('trauma-dislocation-')) newValue += 0.3;
        if (key.startsWith('trauma-bruises-')) newValue += 0.03;
      }
    }

    newValue -= 0.1;

    return clamp(newValue, 0, 100); // не может длиться более 10 часов
  }
}
