import { Static } from '../../shared';
import { Vector3 } from '../../shared';

export class CulledPropManager extends Static {
  static props = {};

  static update(id: number, propInfo: Partial<CulledProp>) {
    const prop: CulledProp = CulledPropManager.props[id];
    if (prop) {
      Object.assign(prop, propInfo);
      emitNet('engineCore:CulledProp:update', -1, GetCurrentResourceName(), prop.serialize());
    }
  }
}

export class CulledProp {
  id: number;
  model: string;
  coords: Vector3;
  heading = 0;
  cullDistance = 200;
  registered = false;
  spawned = false;

  constructor(init: Partial<CulledProp>) {
    if (init.coords) init.coords = Vector3.FromObject(init.coords);

    Object.assign(this, init);
  }

  async register(): Promise<number> {
    return new Promise<number>(resolve => {
      emit('engineCore:CulledProp:register', this, id => {
        CulledPropManager.props[id] = this;
        CulledPropManager.update(id, {
          id,
          registered: true,
        });
        resolve(id);
      });
    });
  }

  serialize() {
    return {
      id: this.id,
      model: this.model,
      coords: this.coords,
      heading: this.heading,
      cullDistance: this.cullDistance,
      registered: this.registered,
      spawned: this.spawned,
    };
  }

  update(): void {
    emit('engineCore:CulledProp:update', this.serialize());
  }

  spawn(): void {
    emit('engineCore:CulledProp:spawn', this.id);
  }

  despawn(): void {
    this.spawned = false;
    emit('engineCore:CulledProp:despawn', this.id);
  }

  remove(): void {
    emit('engineCore:CulledProp:remove', this.id);
  }
}

on('engineLib:CulledProp:update', (init: Partial<CulledProp>) => {
  CulledPropManager.update(init.id, init);
});

