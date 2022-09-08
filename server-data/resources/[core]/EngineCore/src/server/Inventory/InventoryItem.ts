import { DB } from '@nova/engine-lib/server/DB';
import { assert, Log, Vector2 } from '@nova/engine-lib/shared';
import { ItemTypes } from './ItemTypes';

export type InventoryItemQuery = Partial<InventoryItem>;

function tableContains(t1, t2) {
  if (typeof t1 == 'number' && typeof t2 == 'number') {
    if (Math.abs(t1 - t2) < 1e-7) {
      return true;
    }
  }

  if (typeof t1 != 'object' || typeof t2 != 'object') {
    return t1 == t2;
  }

  for (const [k, v] of Object.entries(t2)) {
    if (!tableContains(t1[k], t2[k])) {
      return false;
    }
  }

  return true;
}

export type InventoryItemInfo = {
  id: number;
  extra: any;
  amount: number;
  item_id: number;
};

export class InventoryItem {
  uid: number;
  name: string;
  template_id: number;
  category: string;
  actions: any[];

  x: number;
  y: number;
  width: number;
  height: number;

  amount: number;
  weight: number;
  extra: any;

  description: string;

  Duplicate(): InventoryItem {
    const res = new InventoryItem();
    for (const [k, v] of Object.entries(this)) {
      res[k] = v;
    }

    res.uid = null;
    return res;
  }

  Update(): InventoryItem {
    const actions = {} as any;

    actions.player = {};
    actions.container = {};

    actions.player.drop = {
      label: 'Выбросить',
      priority: 1,
    };

    actions.container.drop = {
      label: 'Выбросить',
      priority: 1,
    };
    /*
    actions.player['container-put'] = {
        ['label'] = 'Положить',
        ['priority'] = 2
    }

    actions.container['container-get'] = {
        ['label'] = 'Забрать',
        ['priority'] = 2
    }
*/
    this.actions = actions;

    const itemType = ItemTypes[this.category];

    if (itemType && itemType.getActions) {
      this.actions = itemType.getActions(this);
    }

    if (itemType && itemType.getDescription) {
      this.description = itemType.getDescription(this);
    }

    return this;
  }

  DBUpdatePos(pos: Vector2): boolean {
    assert(this.uid);
    assert(pos);

    const res = DB.Query('inventoryitem/updatepos', {
      id: this.uid,
      x: pos.x ?? 0,
      y: pos.y ?? 0,
    });

    if (res[1] != 200) {
      Log.error('Unable to update item pos!');
      Log.error(res);
      return false;
    }

    return true;
  }

  Match(query: InventoryItemQuery): boolean {
    for (const [k, v] of Object.entries(query)) {
      if (k == 'amount') {
        if (this[k] < v) {
          return false;
        }
      } else if (k == 'actions') {
        // do nothing
      } else if (typeof this[k] == 'object' && typeof v == 'object') {
        if (!tableContains(this[k], v)) {
          return false;
        }
      } else if (this[k] != v) {
        return false;
      }
    }

    return true;
  }
}
