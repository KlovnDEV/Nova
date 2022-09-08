/* eslint-disable no-await-in-loop */
import { AnimationFlags, LocalPlayer, Ped, PedTypes } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';
import Config from '../../config/tattoo';
import { ShopConfig } from './markers';

async function spawnShopPed(shopId, shop) {
  const p = shop.ped;

  const { instance } = p as { instance: Ped };

  if (instance) {
    if (instance.exist && instance.alive && instance.coords.distanceTo(p.coords) < 3.0) {
      // Log.debug('ped exist');
      return instance;
    }

    // Log.debug('remove ped');
    await instance.remove();
  }

  if (!instance || !instance.exist) {
    // Log.debug('spawn new ped', shopId);
    const ped = await Ped.Spawn(p.model, p.coords, p.heading, PedTypes.CIVMALE, false, false);

    ped.dynamic = false;
    ped.freezePosition = true;
    ped.blockNonTemporaryEvents = true;
    ped.invincible = true;

    ped.tasks.startScenario('WORLD_HUMAN_GUARD_STAND');

    return ped;
  }

  return instance;
}

// Задаём анимацию педа в зависимости от состояния
async function pedUpdate(shop: any, ped: Ped) {
  if (LocalPlayer.isFreeAimingAtEntity(ped)) {
    ped.tasks.clear();
    //   ped.tasks.startScenario('CODE_HUMAN_STAND_COWER');

    ped.tasks.playAnim({
      animDictionary: 'missminuteman_1ig_2',
      animationName: 'handsup_base',
      // eslint-disable-next-line no-bitwise
      flags: AnimationFlags.REPEAT | AnimationFlags.UPPERBODY,
    });

    while (LocalPlayer.isFreeAimingAtEntity(ped)) {
      await Delay(1000);
    }
    ped.tasks.clear();
    ped.tasks.startScenario('WORLD_HUMAN_GUARD_STAND');
  }
}

// Спавним педов, обновляем состояние
setTick(async () => {
  await Delay(1000);

  await Promise.all(
    Object.entries(Config.Shops).map(async ([shopId, shopConfig]: [string, ShopConfig]) => {
      const ped = await spawnShopPed(shopId, shopConfig);

      // eslint-disable-next-line no-param-reassign
      shopConfig.ped.instance = ped;
      await pedUpdate(shopConfig, ped);
    }),
  );
});
