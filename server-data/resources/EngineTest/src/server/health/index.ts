import { Players } from '@nova/engine-lib/server/Game';
import { assert, Delay, Log, Random } from '@nova/engine-lib/shared';

onNet('health:trauma', function (trauma: string, limb: string, severity: number) {
  const player = Players.ByHandle(source);
  assert(player);
  assert(severity > 0);
  assert(['fracture', 'dislocation', 'bruises', 'concussion'].includes(trauma));
  assert(['larm', 'rarm', 'lleg', 'rleg', 'torso', 'head'].includes(limb));

  // минут будет длиться эффект
  const timeMinMax: Record<string, [number, number]> = {
    fracture: [120, 360],
    dislocation: [60, 120],
    bruises: [10, 30],
    concussion: [120, 240],
  };

  if (trauma == 'concussion') {
    player.status.add(`trauma-${trauma}`, Random.randint(...timeMinMax[trauma]) * 60.0);
    return;
  }

  player.status.add(`trauma-${trauma}-${limb}`, Random.randint(...timeMinMax[trauma]) * 60.0);
  player.status.add('pain', +severity);
});
