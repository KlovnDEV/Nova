import { assert, Delay, Vector3 } from '@nova/engine-lib/shared';

const culledProps = {};

export class CulledProp {
  private cooldown = undefined; // сколько секунд осталось до респавна, либо undefined
  private static GLOBAL_COUNTER = 1;
  readonly id: number;
  model: string;
  coords: Vector3;
  heading = 0;
  cullDistance = 200; // дальность отрисовки
  registered = false; // проп зарегистрирован в таблице пропов
  spawned = false; // проп заспавнен в мир

  constructor(init: Partial<CulledProp>) {
    this.id = CulledProp.GLOBAL_COUNTER;
    CulledProp.GLOBAL_COUNTER += 1;

    if (init.coords) init.coords = Vector3.FromObject(init.coords);

    Object.assign(this, init);
  }

  register(): void {
    this.registered = true;
    culledProps[this.id] = this;
    this.update();
  }

  serialize(): Record<string, any> {
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
    const serialized = this.serialize();
    emit('engineLib:CulledProp:update', serialized);
  }

  spawn(): void {
    this.spawned = true;
    this.update();
  }

  despawn(): void {
    this.spawned = false;
    this.update();
  }

  remove(): void {
    this.despawn();
    delete culledProps[this.id];
    emit('engineLib:CulledProp:remove', this.id);
  }

  tick(): void {
    if (this.cooldown !== undefined) {
      if (this.cooldown > 0) {
        this.cooldown -= 1;
      } else {
        this.cooldown = undefined;
        this.spawn();
      }
    }
  }
}

setTick(async () => {
  await Delay(1000);

  Object.values<CulledProp>(culledProps).forEach(prop => {
    prop.tick();
  });
});

on('engineCore:CulledProp:register', (init: Partial<CulledProp>, cb) => {
  const prop = new CulledProp(init);
  prop.register();

  cb(prop.id);
});

on('engineCore:CulledProp:spawn', (id: number) => {
  assert(culledProps[id], `unable to spawn culled prop ${id}`);
  culledProps[id].spawn();
});

on('engineCore:CulledProp:despawn', (id: number) => {
  assert(culledProps[id], `unable to despawn culled prop ${id}`);
  culledProps[id].despawn();
});

on('engineCore:CulledProp:remove', (id: number) => {
  assert(culledProps[id], `unable to remove culled prop ${id}`);
  culledProps[id].remove();
});

on('engineCore:CulledProp:update', (init: Partial<CulledProp>) => {
  assert(init && init.id !== undefined);
  const { id } = init;
  assert(culledProps[id]);

  Object.assign(culledProps[id], init);
  culledProps[id].update();
});
