import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';

onNet('inventory:smoke', async (val: number) => {
  emit('dpemotes:emote', 'smoke2');
  await Delay(1000);

  const { ped } = LocalPlayer;

  for (let i = 0; i < 30; i += 1) {
    if (ped.tasks.isPlayingAnim('amb@world_human_aa_smoke@male@idle_a', 'idle_c')) {
      TriggerServerEvent('engine:effects:smokeTick', val / 30.0);
      await Delay(1000);
    } else {
      break;
    }
  }

  ped.tasks.clear();
});

setTick(async () => {
  await Delay(1000);

  const { smoking } = LocalPlayer.status;
  const smokingAddiction = LocalPlayer.status['smoking-addiction'];
});
