/* eslint-disable no-bitwise */
import { AnimationFlags, Ped } from '@nova/engine-lib/client/Game';
import { Controls, DisabledControl } from '@nova/engine-lib/client/Input';
import { Delay } from '@nova/engine-lib/shared';
import Config from '../../config/holsterweapon';

export async function unholsterPolice(ped: Ped): Promise<void> {
  await ped.tasks.playAnim({
    animDictionary: 'reaction@intimidation@cop@unarmed',
    animationName: 'intro',
    blendOutSpeed: 2.0,
    playbackRate: 2.0,
    flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME,
  });

  await Delay(Config.CooldownPolice);

  while (
    ped.tasks.isPlayingAnim('reaction@intimidation@cop@unarmed', 'intro') &&
    !DisabledControl.Pressed(Controls.AIM) &&
    !DisabledControl.Pressed(Controls.ATTACK)
  ) {
    // eslint-disable-next-line no-await-in-loop
    await Delay(0);
  }

  ped.tasks.clear();
}

export async function holsterPolice(ped: Ped): Promise<void> {
  ped.tasks.playAnim({
    animDictionary: 'rcmjosh4',
    animationName: 'josh_leadout_cop2',
    blendOutSpeed: 2.0,
    playbackRate: 10,
    flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY,
  });

  await Delay(500);

  ped.tasks.playAnim({
    animDictionary: 'reaction@intimidation@cop@unarmed',
    animationName: 'outro',
    blendOutSpeed: 2.0,
    playbackRate: 2.0,
    flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME,
  });

  await Delay(60);
  ped.tasks.clear();
}

export async function unholsterCivil(ped: Ped): Promise<void> {
  await ped.tasks.playAnim({
    animDictionary: 'reaction@intimidation@1h',
    animationName: 'intro',
    blendInSpeed: 5.0,
    blendOutSpeed: 1.0,
    flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME,
  });

  await Delay(Config.cooldown);

  ped.tasks.clear();
}

export async function holsterCivil(ped: Ped): Promise<void> {
  ped.tasks.playAnim({
    animDictionary: 'reaction@intimidation@1h',
    animationName: 'outro',
    blendOutSpeed: 3.0,
    flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME,
  });

  await Delay(1700);
  ped.tasks.clear();
}
