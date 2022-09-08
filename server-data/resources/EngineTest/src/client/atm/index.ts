/* Не привязано к деньгам */
/* eslint-disable no-param-reassign */
import '@citizenfx/client/';
import { LocalPlayer, Prop } from '@nova/engine-lib/client/Game';
import { Control, Keys } from '@nova/engine-lib/client/Input';

import './anims';
import './markers';
import State from './State';
import { showBank } from './ui';

function getClosestATM(dist): Prop {
  const modelNames = ['prop_fleeca_atm', 'prop_atm_02', 'prop_atm_01', 'prop_atm_03'];
  const { coords } = LocalPlayer;

  for (const model of modelNames) {
    return Prop.getClosestOfType(coords, dist, model);
  }

  return null;
}

setTick(async () => {
  if (Control.JustReleased(Keys.E)) {
    if (State.BankZone) return;
    const atmEntity = getClosestATM(1.0);
    if (atmEntity.exist) {
      showBank({ atm: atmEntity });
    }

    // TriggerScreenblurFadeIn(500.0)
    // SetNuiFocus(true, true)
  }
});
