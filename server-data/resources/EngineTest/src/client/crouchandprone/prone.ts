/* eslint-disable no-await-in-loop */
import { AnimationFlags, Ped } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';
import { Control, Controls } from '@nova/engine-lib/client/Input';
import { resetGait } from './gait';

function headingChange(ped: Ped) {
  const frameTime = GetFrameTime();
  if (Control.Pressed(Controls.MOVE_LEFT_ONLY)) {
    // eslint-disable-next-line no-param-reassign
    ped.heading += 40.0 * frameTime;
  } else if (Control.Pressed(Controls.MOVE_RIGHT_ONLY)) {
    // eslint-disable-next-line no-param-reassign
    ped.heading -= 40.0 * frameTime;
  }
}

export async function proneStart(ped: Ped): Promise<void> {
  await resetGait(ped);

  ped.tasks.clear();

  await ped.tasks.playAnim({
    animDictionary: 'move_crawl',
    animationName: 'onfront_fwd',
    blendInSpeed: 2.0,
    // blendOutSpeed: 0.1,
    flags: AnimationFlags.STOP_LAST_FRAME,
  });

  await Delay(100);

  ped.tasks.setAnimCurrentTime('move_crawl', 'onfront_fwd', 0.99);

  await Delay(300);
}

export async function proneEnd(ped: Ped): Promise<void> {
  await resetGait(ped);

  SetPedToRagdoll(ped.handle, 10, 10, 0, false, false, false);
  await Delay(1000);
  ped.tasks.clear();
  await Delay(100);
}

export async function proneTick(ped: Ped): Promise<void> {
  if (Control.Pressed(Controls.MOVE_UP_ONLY)) {
    if (!ped.tasks.isPlayingAnim('move_crawl', 'onfront_fwd')) {
      await ped.tasks.playAnim({
        animDictionary: 'move_crawl',
        animationName: 'onfront_fwd',
        blendInSpeed: 1.0,
        blendOutSpeed: 0.0,
        flags: AnimationFlags.STOP_LAST_FRAME,
      });
    } else if (ped.tasks.getAnimCurrentTime('move_crawl', 'onfront_fwd') >= 0.99) {
      ped.tasks.setAnimCurrentTime('move_crawl', 'onfront_fwd', 0.0);
    }
    headingChange(ped);
  } else if (Control.Pressed(Controls.MOVE_DOWN_ONLY)) {
    if (!ped.tasks.isPlayingAnim('move_crawl', 'onfront_bwd')) {
      await ped.tasks.playAnim({
        animDictionary: 'move_crawl',
        animationName: 'onfront_bwd',
        blendInSpeed: 1.0,
        blendOutSpeed: 0.0,
        flags: AnimationFlags.STOP_LAST_FRAME,
      });
    } else if (ped.tasks.getAnimCurrentTime('move_crawl', 'onfront_bwd') >= 0.99) {
      ped.tasks.setAnimCurrentTime('move_crawl', 'onfront_bwd', 0.0);
    }

    headingChange(ped);
  }
}
