import { Vector3, Delay, Log } from '@nova/engine-lib/shared';
import { loadModel } from '@nova/engine-lib/client/Utils';

const culledProps: Record<string, CulledProp> = {};
export class CulledProp {
  id: string;
  model: string;
  coords: Vector3;
  heading = 0;
  cullDistance = 200;
  spawned: boolean;
  registered: boolean;

  prop = 0;
  private _currentDistance = 99999;

  constructor(init: Partial<CulledProp>, understandTheConsequences = false) {
    if (!understandTheConsequences) throw new Error('Attempt to instance class CulledProp!');
    Object.assign(this, init);
  }

  async spawn(): Promise<boolean> {
    if (DoesEntityExist(this.prop)) return false;
    await loadModel(this.model);

    this.prop = CreateObjectNoOffset(this.model, this.coords.x, this.coords.y, this.coords.z, false, false, false);
    SetEntityAlpha(this.prop, 0, false);
    FreezeEntityPosition(this.prop, true);

    for (let i = 0; i < 255; i += 51) {
      SetEntityAlpha(this.prop, i, false);
      // eslint-disable-next-line no-await-in-loop
      await Delay(0);
    }

    SetEntityAlpha(this.prop, 255, false);

    SetModelAsNoLongerNeeded(this.model);
    // await this.prop.fadeIn(false);

    const success = DoesEntityExist(this.prop);

    if (success) {
      emit('engineCore:CulledProp:spawn', this.id);
    }

    return success;
  }

  async despawn(): Promise<boolean> {
    Log.info('despawn', this.id, this.prop);
    if (!DoesEntityExist(this.prop)) return false;
    // await this.prop.fadeOut(true, true);

    for (let i = 255; i > 0; i -= 51) {
      SetEntityAlpha(this.prop, i, false);
      // eslint-disable-next-line no-await-in-loop
      await Delay(0);
    }

    SetEntityAlpha(this.prop, 0, false);

    DeleteObject(this.prop);

    emit('engineCore:CulledProp:despawn', this.id);

    return true;
  }

  async tick(playerCoords: Vector3): Promise<void> {
    const distance = playerCoords.distanceTo(this.coords);
    this._currentDistance = distance;

    if (DoesEntityExist(this.prop)) {
      if (!this.spawned) {
        await this.despawn();
      } else if (distance > this.cullDistance + 1 && !IsEntityOnScreen(this.prop)) {
        await this.despawn();
      }
    } else if (distance < this.cullDistance && this.spawned) {
      await this.spawn();
    }
  }

  get distance() {
    return this._currentDistance;
  }
}

setTick(async () => {
  await Delay(1000);
  const coords = Vector3.FromArray(GetEntityCoords(PlayerPedId(), true));

  Object.values<CulledProp>(culledProps).forEach(prop => {
    prop.tick(coords);
  });
});

onNet('engineCore:CulledProp:update', (resourceName, propInfo) => {
  // TODO: выгружать пропы при остановке ресурсов
  if (!culledProps[propInfo.id]) {
    culledProps[propInfo.id] = new CulledProp(propInfo, true);
  } else {
    Object.assign(culledProps[propInfo.id], propInfo);
  }
});
