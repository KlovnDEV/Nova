import { Delay } from '../shared/Utils';
export * from '../shared/Utils';

export async function loadAnimDict(dict: string): Promise<void> {
  if (!HasAnimDictLoaded(dict)) {
    RequestAnimDict(dict);

    while (!HasAnimDictLoaded(dict)) {
      // eslint-disable-next-line no-await-in-loop
      await Delay(0);
    }
  }
}

export async function loadAnimSet(dict: string): Promise<void> {
  if (!HasAnimSetLoaded(dict)) {
    RequestAnimSet(dict);

    while (!HasAnimSetLoaded(dict)) {
      // eslint-disable-next-line no-await-in-loop
      await Delay(0);
    }
  }
}

export async function loadTextureDict(dict: string): Promise<void> {
  if (HasStreamedTextureDictLoaded(dict)) return;

  RequestStreamedTextureDict(dict, true);

  while (!HasStreamedTextureDictLoaded(dict)) {
    // eslint-disable-next-line no-await-in-loop
    await Delay(0);
  }
}

export async function loadModel(model: string): Promise<void> {
  RequestModel(model);
  while (!HasModelLoaded(model)) {
    // eslint-disable-next-line no-await-in-loop
    await Delay(0);
  }
}

export function findIterator(First: Function, Next: Function, End: Function): number[] {
    const objects: number[] = [];
    let iterator: number;
    let veh: number;

    [iterator, veh] = First();
    if (!veh) {
      End(iterator);
      return [];
    }

    let success = true;

    do {
      objects.push(veh);
      [success, veh] = Next(iterator);
    } while (success);

    End(iterator);

    return objects;
}