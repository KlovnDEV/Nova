import { Entity } from './Entity';
import { promiseTimeout } from '../../shared';
import { Vector3 } from '../../shared/Math';
import { loadModel } from '../Utils';

export class Prop extends Entity {
  handle: number;

  static FromEntity(entity: Entity): Prop {
    if (!IsEntityAnObject(entity.handle)) {
      throw new Error('Unable to cast Entity to Prop!');
    }

    return new Prop(entity.handle);
  }

  static async Spawn(
    model: string,
    coords: Vector3,
    heading = 0,
    isNetwork = true,
    netMissionEntity = false,
    dynamic = false,
  ): Promise<Prop> {
    const promise = new Promise<Prop>((resolve, reject) => {
      setImmediate(async () => {
        await loadModel(model);

        const prop = new Prop(
          CreateObjectNoOffset(model, coords.x, coords.y, coords.z, isNetwork, netMissionEntity, dynamic),
        );

        SetModelAsNoLongerNeeded(model);

        if (!prop.exist) reject(new Error(`Prop не создан!`));

        prop.heading = heading;

        ActivatePhysics(prop.handle);

        resolve(prop);
      });
    });

    return promiseTimeout<Prop>(promise, 10000);
  }

  static getClosestOfType(coords: Vector3, radius: number, model: string | number, isMission: boolean = false) {
    return new Prop(GetClosestObjectOfType(coords.x, coords.y, coords.z, radius, model, isMission, false, false))
  }

  remove(): void {
    DeleteObject(this.handle);
  }

  static get None(): Prop {
    return new Prop(0);
  }
}
