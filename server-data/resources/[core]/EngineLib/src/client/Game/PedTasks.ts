import { loadAnimDict } from '../Utils';
import { Vector3 } from '../../shared/Math';
import { Entity } from './Entity';
import { Delay } from '../../shared';

type PlayAnimProps = {
  animDictionary: string;
  animationName: string;
  blendInSpeed?: number;
  blendOutSpeed?: number;
  duration?: number;
  flags?: AnimationFlags;
  playbackRate?: number;
  lockX?: boolean;
  lockY?: boolean;
  lockZ?: boolean;
  wait?: number;
  waitForEnd?: boolean;
}

export enum AnimationFlags {
  NORMAL = 0,
  REPEAT = 1,
  STOP_LAST_FRAME = 2,
  UPPERBODY = 16,
  ENABLE_PLAYER_CONTROL = 32,
  CANCELABLE = 120,
};


export class PedTasks {
  private handle: number;

  constructor(handle: number) {
    this.handle = handle;
  }

  clear(immediately: boolean = false) {
    if (immediately) {
      ClearPedTasksImmediately(this.handle);  
    } else {
      ClearPedTasks(this.handle);
    }
  }

  clearSecondary() {
    ClearPedSecondaryTask(this.handle)
  }

  isPlayingAnim(dict: string, name: string, flag: number = 3) {
    return IsEntityPlayingAnim(this.handle, dict, name, flag);
  }

  getAnimCurrentTime(dict: string, name: string) {
    return GetEntityAnimCurrentTime(this.handle, dict, name);
  }

  setAnimCurrentTime(dict: string, name: string, time: number) {
    SetEntityAnimCurrentTime(this.handle, dict, name, time);
  }

  stopAnimTask(dict: string, name: string) {
    StopAnimTask(this.handle, dict, name, 2);
  }

  async playAnim(props: PlayAnimProps) {

    const defaultProps: PlayAnimProps = {
      animDictionary: undefined,
      animationName: undefined,
      blendInSpeed: 8.0,
      blendOutSpeed: -8.0,
      duration: -1,
      flags: AnimationFlags.NORMAL,
      playbackRate: 0,
      lockX: false,
      lockY: false,
      lockZ: false,
      wait: 0,
      waitForEnd: false, 
    }

    const p = {...defaultProps};
    Object.assign(p, props);

    await loadAnimDict(props.animDictionary);
    TaskPlayAnim(
      this.handle,
      p.animDictionary,
      p.animationName,
      p.blendInSpeed,
      p.blendOutSpeed,
      p.duration,
      p.flags,
      p.playbackRate,
      p.lockX,
      p.lockY,
      p.lockZ,
    );

    if (p.waitForEnd) {
      do {
        await Delay(0);
      } while (this.isPlayingAnim(p.animDictionary, p.animationName));
    }

    if (p.wait) await Delay(p.wait);
  }

  startScenario(name: string, playEnterAnim = true): void {
    TaskStartScenarioInPlace(this.handle, name, 0, playEnterAnim);
  }

  startScenarioAtPosition(
    name: string,
    coords: Vector3,
    heading: number,
    duration: number,
    sittingScenario = false,
    teleport = false,
  ): void {
    TaskStartScenarioAtPosition(
      this.handle,
      name,
      coords.x,
      coords.y,
      coords.z,
      heading,
      duration,
      sittingScenario,
      teleport,
    );
  }

  turnToFaceEntity(entity: Entity, duration = -1) {
    return TaskTurnPedToFaceEntity(this.handle, entity.handle, duration);
  }

  turnToFaceCoord(coords: Vector3, duration = -1) {
    return TaskTurnPedToFaceCoord(this.handle, coords.x, coords.y, coords.z, duration);
  }

  goToEntity(entity: Entity, duration: number, distance: number, speed: number) {
    TaskGoToEntity(this.handle, entity.handle, duration, distance, speed, 0, 0);
  }

  setPropertyFloat(signalName: string, value: number) {
    SetTaskPropertyFloat(this.handle, signalName, value);
  }

  setPropertyBool(signalName: string, value: boolean) {
    SetTaskPropertyBool(this.handle, signalName, value);
  }

}
