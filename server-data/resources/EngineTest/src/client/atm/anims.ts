import { Ped, Entity, Prop } from '@nova/engine-lib/client/Game/';
import { AnimationFlags } from '@nova/engine-lib/client/Game/Ped';
import { Delay, Vector3 } from '@nova/engine-lib/shared';

async function headTowardsEntity(ped: Ped, entity: Entity, timeout) {
  for (let k = 1; k < timeout * 10; k += 1) {
    const { coords } = entity;

    if (ped.isHeadingTowardsPosition(coords, 10.0)) {
      break;
    }

    ped.tasks.turnToFaceEntity(entity, 200);
    // eslint-disable-next-line no-await-in-loop
    await Delay(100);
  }
}

async function moveTowardsEntity(ped: Ped, entity: Entity, minDist = 0.0, timeout = 10000) {
  for (let k = 1; k < timeout * 10; k += 1) {
    const curDist = ped.coords.distanceTo(entity.coords);

    if (curDist <= minDist + 0.01) {
      break;
    }

    ped.tasks.goToEntity(entity, 200, 0.0, 4.0);
    // eslint-disable-next-line no-await-in-loop
    await Delay(100);
  }
}

export async function playATMAnimIn(ped: Ped, atmEntity: Entity): Promise<void> {
  const boneIndex = ped.getBoneIndex(57005); // 18905 = left hand, 57005 = right hand
  const prop = await Prop.Spawn('prop_cs_credit_card', ped.coords, 0, true, false, true);
  prop.setAlpha(0);
  // prettier-ignore
  prop.attachToEntity(ped, boneIndex, new Vector3(0.162, 0.038, -0.021), new Vector3(10.0, 175.0, 0.0), true, false, true, 1, true);

  if (atmEntity) {
    ped.tasks.clear();
    await Delay(0);

    await moveTowardsEntity(ped, atmEntity, 1.16, 5);
    ped.tasks.clear();
    await headTowardsEntity(ped, atmEntity, 5);
    ped.tasks.clear();
  }

  prop.setAlpha(255);

  await ped.tasks.playAnim({
    animDictionary: 'anim@mp_atm@enter',
    animationName: 'enter',
    flags: AnimationFlags.STOP_LAST_FRAME,
    wait: 1300,
  });

  prop.remove();
  await Delay(2700);

  await ped.tasks.playAnim({
    animDictionary: 'anim@mp_atm@base',
    animationName: 'base',
    flags: AnimationFlags.REPEAT,
  });
}

export async function playATMAnimOut(ped: Ped): Promise<void> {
  const boneIndex = ped.getBoneIndex(57005); // 18905 = left hand, 57005 = right hand
  const prop = await Prop.Spawn('prop_cs_credit_card', ped.coords, 0, true, false, true);
  prop.setAlpha(0);
  // prettier-ignore
  prop.attachToEntity(ped, boneIndex, new Vector3(0.162, 0.038, -0.021), new Vector3(10.0, 175.0, 0.0), true, true, false, 1, true);

  await ped.tasks.playAnim({
    animDictionary: 'amb@prop_human_atm@male@exit',
    animationName: 'exit',
    wait: 3000,
  });

  prop.setAlpha(255);

  await Delay(2000);
  prop.remove();
}
