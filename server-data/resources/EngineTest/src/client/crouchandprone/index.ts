/* eslint-disable no-await-in-loop */
import { LocalPlayer, Ped } from '@nova/engine-lib/client/Game';
import { Control, Controls } from '@nova/engine-lib/client/Input';
import { Delay } from '@nova/engine-lib/client/Utils';

import { pedDive } from './dive';
import { resetGait, setCrouchedGait } from './gait';
import { proneEnd, proneStart, proneTick } from './prone';
import { MoveState } from './utils';

const crouchKey = Controls.DUCK; // CTRL
let currentState: MoveState = MoveState.STAND;

async function setState(state: MoveState) {
  const { ped } = LocalPlayer;

  if (state == currentState) return;

  // Log.debug('Crouch state transition: ', currentState, ' -> ', state);

  if (state == MoveState.CROUCH && currentState == MoveState.STAND) {
    await setCrouchedGait(ped);
  }

  if (state == MoveState.STAND && currentState == MoveState.CROUCH) {
    await resetGait(ped);
  }

  if (state == MoveState.STAND && currentState == MoveState.PRONE) {
    await proneEnd(ped);
  }

  if (state == MoveState.PRONE && currentState == MoveState.CROUCH) {
    await proneStart(ped);
  }

  currentState = state;
}

setTick(async () => {
  await Delay(100);

  const { ped } = LocalPlayer;

  if (ped.isInAnyVehicle(true) || ped.isSwimming || ped.isInAir || ped.isDead || ped.isAttached) {
    setState(MoveState.STAND);
  }
});

async function pedTick(ped: Ped) {
  if (IsPauseMenuActive()) return;

  // State selector
  if (Control.JustPressed(crouchKey)) {
    await setState((currentState + 1) % 3);
    return;
  }
  if (Control.JustPressed(Controls.VEH_DUCK)) {
    await setState(MoveState.STAND);
    return;
  }

  if (currentState == MoveState.PRONE) {
    await proneTick(ped);
  } else if (currentState == MoveState.STAND) {
    if (Control.JustPressed(Controls.MULTIPLAYER_INFO) && Control.Pressed(Controls.SPRINT)) {
      pedDive(ped);
    }
  }
}

setTick(async () => {
  const { ped } = LocalPlayer;

  // Disable stealth movement
  if (ped.stealth) {
    ped.stealth = false;
  }

  if (ped.exist && !ped.isDead) {
    await pedTick(ped);
  }
});
