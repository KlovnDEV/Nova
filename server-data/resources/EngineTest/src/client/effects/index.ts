import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';
import './alcohol';
import './smoking';

let currentEffect = null;

function setEffect(effect: string, strength: number) {
  currentEffect = effect;
  SetTimecycleModifier(effect);
  SetTimecycleModifierStrength(strength);
}

function updateEffects(s: Record<string, number>) {
  if (s.alcohol == 0 && s['alcohol-addiction'] > 10) {
    setEffect('nightvision', ((s['alcohol-addiction'] - 10) / 90.0) * 3);
  } else if (s.smoking == 0 && s['smoking-addiction'] > 10) {
    setEffect('fp_vig_black', (s['smoking-addiction'] - 10) / 90.0);
  } else if (s.drugs == 0 && s['drugs-addiction'] > 10) {
    setEffect('hud_def_flash', Math.sqrt((s['drugs-addiction'] - 10) / 90.0));
  } else if (currentEffect) {
    ClearTimecycleModifier();
    currentEffect = null;
  }
}

setTick(async () => {
  await Delay(1000);

  const { status } = LocalPlayer;
  updateEffects(status);
});
