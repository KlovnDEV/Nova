import { CulledProp, Players } from '@nova/engine-lib/server/Game';
import { assert, Delay, Log, Random, Vector3 } from '@nova/engine-lib/shared';

class Gatherable {
  cooldown: number;
  model: string;
  coords: Vector3;
  radius: number;
  culledProp: CulledProp;
  category: string;
  respawn: number;

  constructor(category: string, model: string, coords: Vector3, radius: number, respawn: number) {
    this.model = model;
    this.coords = coords;
    this.category = category;
    this.radius = radius;
    this.respawn = respawn;
    this.culledProp = new CulledProp({
      model,
      coords,
      cullDistance: 500.0,
      spawned: true,
    });
  }
}

const gatherables: Gatherable[] = [];

async function addGatherable(gatherable: Gatherable) {
  await gatherable.culledProp.register();
  gatherables.push(gatherable);
}

(async () => {
  await Delay(1000);

  // деревья
  await addGatherable(new Gatherable('tree', 'prop_tree_cedar_s_01', new Vector3(-762, 5532.77, 31.98), 2.0, 30000));
  await addGatherable(new Gatherable('tree', 'prop_tree_cedar_s_02', new Vector3(-724.61, 5367.21, 59.5), 2.0, 30000));
  await addGatherable(new Gatherable('tree', 'prop_tree_cedar_s_01', new Vector3(-707.41, 5371.19, 60.8), 2.0, 30000));
  await addGatherable(new Gatherable('tree', 'prop_tree_cedar_s_02', new Vector3(-710.39, 5359.25, 63.54), 2.0, 30000));

  // руда
  await addGatherable(new Gatherable('ore-iron', 'prop_rock_3_a', new Vector3(-508.26, 5632.21, 55.78), 4.0, 60000));
  await addGatherable(new Gatherable('ore-iron', 'prop_rock_3_a', new Vector3(-561.99, 1889.48, 122.09), 4.0, 60000));
  await addGatherable(new Gatherable('ore-iron', 'prop_rock_3_a', new Vector3(-563.07, 1885.76, 122.01), 4.0, 60000));
  await addGatherable(new Gatherable('ore-iron', 'prop_rock_3_a', new Vector3(-565.57, 1887.3, 122.03), 4.0, 60000));

  // // кусты
  // await addGatherable(
  //   new Gatherable('bush-test', 'h4_prop_bush_buddleia_sml_01', new Vector3(617.06, 4342.17, 76.19), 2.0, 30000),
  // );
  // await addGatherable(
  //   new Gatherable('bush-test', 'h4_prop_bush_buddleia_sml_01', new Vector3(1528.55, 4436.31, 38.0), 2.0, 30000),
  // );
  // await addGatherable(
  //   new Gatherable('bush-test', 'h4_prop_bush_buddleia_sml_01', new Vector3(1782.5, 4795.8, 33.91), 2.0, 30000),
  // );

  // for (let i = 0; i < 10000; i += 1) {
  //   const x = Random.randint(-1000, 1000);
  //   const y = Random.randint(-1000, 1000);
  //   const z = 69.5;
  //   // eslint-disable-next-line no-await-in-loop
  //   await addTree(new Tree('prop_tree_cedar_s_02', new Vector3(x, y, z)));
  // }

  const gatherableData = gatherables.map(gatherable => ({
    category: gatherable.category,
    model: gatherable.model,
    coords: gatherable.coords,
    radius: gatherable.radius,
    id: gatherable.culledProp.id,
  }));

  emitNet('gatherables:sendGatherables', -1, gatherableData);
})();

onNet('gatherables:gather', id => {
  const { identifier } = Players.ByHandle(source);

  const gatherable = gatherables.find(t => t.culledProp.id == id);

  assert(gatherable, `unknown gatherable to gather by player ${identifier}`);

  if (!gatherable.culledProp.spawned) {
    // emitNet('ui:showNotification', source, { text: 'Дерево уже срублено!' });
    return;
  }

  gatherable.culledProp.despawn();
  setTimeout(() => {
    gatherable.culledProp.spawn();
  }, gatherable.respawn);
});
