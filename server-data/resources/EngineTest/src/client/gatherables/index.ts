import { AnimationFlags, LocalPlayer, Spot } from '@nova/engine-lib/client/Game';
import { Weapon } from '@nova/engine-lib/client/Game/PedWeapon';
import { showNotification } from '@nova/engine-lib/client/UI';
import { Delay, Log, Vector3 } from '@nova/engine-lib/shared';

async function doMine(gath: Gatherable) {
  LocalPlayer.ped.tasks.playAnim({
    animDictionary: 'melee@hatchet@streamed_core',
    animationName: 'plyr_front_takedown_b',
    flags: AnimationFlags.REPEAT,
  });

  await Delay(2000);

  LocalPlayer.ped.tasks.clear();

  emitNet('gatherables:gather', gath.id);
}

async function doCutDownTree(gath: Gatherable) {
  if (LocalPlayer.ped.tasks.isPlayingAnim('melee@hatchet@streamed_core', 'plyr_front_takedown_b')) return;
  // if (HasEntityClearLosToEntityInFront(LocalPlayer.ped.handle, currentTree.cullProp.prop.handle)) {
  LocalPlayer.ped.tasks.clear();

  if (LocalPlayer.ped.weapon.selected != Weapon.HATCHET) {
    showNotification('Нужно взять в руки топор!');
    return;
  }

  // ped.tasks.turnToFaceEntity(prop, 1000);

  // await Delay(1000);

  LocalPlayer.ped.tasks.playAnim({
    animDictionary: 'melee@hatchet@streamed_core',
    animationName: 'plyr_front_takedown_b',
    flags: AnimationFlags.REPEAT,
  });

  await Delay(2000);

  emitNet('gatherables:gather', gath.id);

  await Delay(2000);

  LocalPlayer.ped.tasks.clear();

  // showNotification('Получено 1 дерева');
}

class Gatherable {
  spot: Spot;
  category: string;
  model: string;
  coords: Vector3;
  radius: number;
  id: number;
  spawned: boolean;

  constructor(gatherable: Gatherable) {
    this.model = gatherable.model;
    this.category = gatherable.category;
    this.coords = Vector3.FromObject(gatherable.coords);
    this.radius = gatherable.radius;
    this.id = gatherable.id;
    this.spawned = true;

    let onPress;
    let notification;

    switch (this.category) {
      case 'tree':
        onPress = doCutDownTree;
        notification = 'Нажмите ~INPUT_PICKUP~ чтобы срубить дерево';
        break;

      case 'ore-iron':
        onPress = doMine;
        notification = 'Нажмите ~INPUT_PICKUP~ чтобы добыть железо';
        break;

      default:
        Log.error('Unknown gatherable type!', this.category);
    }

    this.spot = new Spot({
      radius: this.radius,
      notificationText: notification,
      onPress: async () => {
        if (onPress !== undefined) {
          await onPress(this);
        } else {
          Log.error('Unknown gatherable type!', this.category);
        }
      },
    });
  }
}

const clientGatherables: Record<string, Gatherable> = {};

onNet('gatherables:sendGatherables', serverGatherables => {
  serverGatherables.forEach(tree => {
    if (!clientGatherables[tree.id]) {
      clientGatherables[tree.id] = new Gatherable(tree);
    }
  });
});

onNet('engineCore:CulledProp:update', (resourceName, culledProp) => {
  if (clientGatherables[culledProp.id] !== undefined) {
    clientGatherables[culledProp.id].spawned = culledProp.spawned;
  }
});

setTick(() => {
  Object.values(clientGatherables).forEach(gatherable => {
    if (gatherable.spawned) {
      gatherable.spot.update(gatherable.coords);
    }
  });
});

// setTick(() => {
//   DrawLightWithRange(LocalPlayer.coords.x, LocalPlayer.coords.y, LocalPlayer.coords.z + 0.5, 255, 255, 250, 10.0, 1.0);
// });
