/* eslint-disable no-bitwise */
import { AnimationFlags, Ped, Prop, Vehicle } from '@nova/engine-lib/client/Game';
import { drawText3D } from '@nova/engine-lib/client/Graphics';
import { Control, Keys } from '@nova/engine-lib/client/Input';
import { loadAnimDict } from '@nova/engine-lib/client/Utils';
import { Delay, Vector3 } from '@nova/engine-lib/shared';
import { GetClosestVehicleTire } from './utils';

let tireChangeActive = false;
let tireChangeProp: Prop;

export async function tireChangeStop(ped: Ped): Promise<void> {
  if (tireChangeProp != null) {
    if (ped.tasks.isPlayingAnim('anim@heists@box_carry@', 'idle')) {
      ped.tasks.stopAnimTask('anim@heists@box_carry@', 'idle');
    }
    tireChangeProp.remove();
    tireChangeProp = null;
  }

  tireChangeActive = false;
}

export async function tireChangeWork(ped: Ped, vehicle: Vehicle): Promise<void> {
  if (tireChangeProp == null) {
    const propName = 'prop_wheel_tyre';
    const { coords } = ped;
    const prop = await Prop.Spawn(propName, coords, 0, true, true, true);
    const boneIndex = ped.getBoneIndex(57005); // 18905 = left hand, 57005 = right hand
    prop.attachToEntity(
      ped,
      boneIndex,
      new Vector3(-0.05, 0.1, -0.32),
      new Vector3(150, 95, 190),
      true,
      false,
      true,
      1,
      true,
    );
    tireChangeProp = prop;
  }

  if (!ped.tasks.isPlayingAnim('anim@heists@box_carry@', 'idle')) {
    ped.tasks.playAnim({
      animDictionary: 'anim@heists@box_carry@',
      animationName: 'idle',
      blendOutSpeed: 8,
      flags: AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME | AnimationFlags.ENABLE_PLAYER_CONTROL,
    });
  }

  const closestTire = GetClosestVehicleTire(vehicle);
  if (closestTire != null) {
    const repDict = 'amb@medic@standing@tendtodead@idle_a';
    const repAnim = 'idle_b';

    if (IsVehicleTyreBurst(vehicle.handle, closestTire.tireIndex, false)) {
      drawText3D(Vector3.FromArray(closestTire.bonePos), '~g~[E] Заменить колесо');
      if (IsControlJustPressed(1, 38)) {
        tireChangeProp.remove();
        tireChangeProp = null;

        if (ped.tasks.isPlayingAnim('anim@heists@box_carry@', 'idle')) {
          ped.tasks.stopAnimTask('anim@heists@box_carry@', 'idle');
        }

        await loadAnimDict(repDict);

        const animDuration = GetAnimDuration(repDict, repAnim);
        await ped.tasks.playAnim({
          animDictionary: repDict,
          animationName: repAnim,
          duration: animDuration,
          flags: 15,
          wait: (animDuration / 2) * 1000,
        });

        TriggerServerEvent('slashtires:repair', vehicle.coords.toArray(), vehicle.model, closestTire.tireIndex);
        tireChangeActive = false;

        await Delay((animDuration / 2) * 1000);
        //							ClearPedTasksImmediately(ped)

        await ped.tasks.playAnim({
          animDictionary: 'amb@medic@standing@tendtodead@exit',
          animationName: 'exit',
          flags: 15,
          wait: 2000,
        });

        ped.tasks.clear();
      }
    }
  }

  if (Control.JustPressed(Keys.BACKSPACE) || Control.JustPressed(Keys.X)) {
    tireChangeActive = false;
    if (ped.tasks.isPlayingAnim('anim@heists@box_carry@', 'idle')) {
      ped.tasks.stopAnimTask('anim@heists@box_carry@', 'idle');
    }
    if (tireChangeProp != null) {
      tireChangeProp.remove();
    }
  }
}

export async function tireChangeTick(ped: Ped, vehicle: Vehicle): Promise<boolean> {
  if (tireChangeActive) {
    await tireChangeWork(ped, vehicle);
  } else if (tireChangeProp != null) {
    tireChangeStop(ped);
  }

  return tireChangeActive;
}

onNet('slashtires:activateTire', function () {
  tireChangeActive = !tireChangeActive;
});
