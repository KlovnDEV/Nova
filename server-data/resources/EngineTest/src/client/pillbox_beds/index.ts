import { AnimationFlags, LocalPlayer, Prop } from '@nova/engine-lib/client/Game';
import { drawText3D } from '@nova/engine-lib/client/Graphics';
import { Control, DisabledControl, Keys } from '@nova/engine-lib/client/Input';
import { Delay } from '@nova/engine-lib/shared';

const props = ['v_med_bed2', 'v_med_bed1', 'v_med_emptybed'];
const activationDistance = 0.6;

let currentBed: Prop = null;
let onBed = false;

async function layOn(bed: Prop) {
  LocalPlayer.ped.coords = bed.coords;
  LocalPlayer.ped.heading = bed.heading + 180;

  await LocalPlayer.ped.tasks.playAnim({
    animDictionary: 'missfbi1',
    animationName: 'cpr_pumpchest_idle',
    flags: AnimationFlags.REPEAT,
  });

  onBed = true;
}

async function layOff() {
  if (!LocalPlayer.ped.tasks.isPlayingAnim('missfbi1', 'cpr_pumpchest_idle')) return;

  LocalPlayer.ped.tasks.clear();
  onBed = false;
}

setTick(async () => {
  await Delay(1000);
  if (!onBed) {
    const found = props.some(value => {
      const closestBed = Prop.getClosestOfType(LocalPlayer.coords, activationDistance, value);

      if (closestBed.exist) {
        currentBed = closestBed;
        return true;
      }

      return false;
    });

    if (!found) {
      currentBed = null;
    }
  }
});

setTick(async () => {
  if (!currentBed || !currentBed.exist) return;

  const { coords } = currentBed;

  if (onBed) {
    Control.Disable(Keys.X);

    drawText3D(coords.addXYZ(0, 0, 0.5), 'Нажмите ~g~[E]~w~ чтобы ~r~встать~s~', 0.55);
    if (Control.JustReleased(Keys.E) || DisabledControl.JustReleased(Keys.X)) {
      await layOff();
    }
  } else {
    drawText3D(coords.addXYZ(0, 0, 0.5), 'Нажмите ~g~[E]~w~ чтобы ~b~лечь~s~', 0.55);
    if (Control.JustReleased(Keys.E)) {
      await layOn(currentBed);
    }
  }
});
