/* eslint-disable max-classes-per-file */
import { DB } from '@nova/engine-lib/server/DB';
import Player, { Players } from '@nova/engine-lib/server/Game';
import { assert, Log, Vector2 } from '@nova/engine-lib/shared';
import { InventoryItem, InventoryItemInfo, InventoryItemQuery } from './InventoryItem';
import { ItemTypes } from './ItemTypes';

const ItemMap = {};

const Inventories = [];

function GetItemExtra(item: InventoryItem) {
  const extra = item.Duplicate();
  extra.actions = null;
  extra.uid = item.uid;
  return extra;
}

export type InventoryInfo = {
  id: number;
  category: string;
  identifier: string;
  title: string;
  current_weight: number;
  max_weight: number;
  width: number;
  height: number;
  auto_stack: boolean;
  single_item: boolean;
  action_group: string;
  areas: string;
};

export type InventoryItemExtra = Record<string, unknown>;

export class InventoryCollision {
  inv: Inventory;
  collision: Array<Array<number>>;

  constructor(inv: Inventory) {
    this.inv = inv;
  }

  Get(): Array<Array<number>> {
    const collision = [];
    for (let x = 1; x < this.inv.width; x += 1) {
      for (let y = 1; y < this.inv.height; y += 1) {
        if (!collision[x]) {
          collision[x] = [];
        }

        collision[x][y] = null;
      }
    }

    for (const item of Object.values(this.inv.items)) {
      const ix = item.x ?? 0;
      const iy = item.y ?? 0;
      let iw = item.width ?? 1;
      let ih = item.height ?? 1;

      if (this.inv.singleItem) {
        iw = 1;
        ih = 1;
      }

      for (let x = ix; x < ix + iw - 1; x += 1) {
        for (let y = iy; y < iy + ih - 1; y += 1) {
          if (collision[x + 1]) {
            collision[x + 1][y + 1] = item.uid;
          } else {
            Log.error(`Collision matrix out of bounds on item ${item.uid}`);
          }
        }
      }
    }

    return collision;
  }

  FindFittingArea(item: InventoryItem): [number, number] {
    assert(item);

    const w = item.width ?? 1;
    const h = item.height ?? 1;

    if (!this.inv.areas) {
      return this.FindEmptyArea(w, h);
    }

    for (const area of Object.values(this.inv.areas)) {
      const itemsInArea = this.ItemsInArea(area.x, area.y, w, h);

      if (itemsInArea.length == 0) {
        if (!area.tags) {
          return [area.x, area.y];
        }
        if (area.tags) {
          for (const tag of area.tags) {
            if (item.category == tag || item.name == tag) {
              return [area.x, area.y];
            }
          }
        }
      }
    }

    return [null, null];
  }

  FindEmptyArea(w: number, h: number): [number, number] {
    assert(w);
    assert(h);

    if (this.inv.singleItem) {
      w = 1;
      h = 1;
    }

    for (let ox = 0; this.inv.width - w; ox += 1) {
      for (let oy = 0; this.inv.height - h; oy += 1) {
        if (this.collision[ox + 1] && !this.collision[ox + 1][oy + 1]) {
          const itemsInArea = this.ItemsInArea(ox, oy, w, h);
          if (itemsInArea.length == 0) {
            return [ox, oy];
          }
        }
      }
    }

    return [null, null];
  }

  ItemsInArea(x: number, y: number, w: number, h: number): Array<number> {
    assert(x);
    assert(y);
    assert(w);
    assert(h);

    if (this.inv.singleItem) {
      w = 1;
      h = 1;
    }

    const uids = {};
    for (let ox = x; ox < x + w - 1; ox += 1) {
      for (let oy = y; oy < y + h - 1; oy += 1) {
        const col = this.collision;
        if (col[ox + 1] && col[ox + 1][oy + 1]) {
          uids[col[ox + 1][oy + 1]] = true;
        }
      }
    }

    const arr = [];
    for (const k of Object.keys(uids)) {
      arr.push(k);
    }

    return arr;
  }
}

type InventoryArea = {
  x: number;
  y: number;
  tags: string[];
};

export class Inventory {
  id: number;

  title: string;
  category: string;
  identifier: string;
  actionGroup: string;
  items: Record<string, InventoryItem>;

  width: number;
  height: number;

  singleItem = false;

  maxWeight: number;
  weight: number;
  // extra: Record<string, any>;

  cash: number;

  nested: Array<Inventory> = [];
  parent: Inventory = null;

  areas: Record<string, InventoryArea> = {};

  Collision: InventoryCollision = new InventoryCollision(this);

  constructor(category: string, identifier: string) {
    this.category = category;
    this.identifier = identifier;
  }

  static LoadFromDB(category: string, identifier: string, extra: InventoryItemExtra = {}): Inventory {
    let res = DB.Query('inventory/get', {
      category: category,
      identifier: identifier,
    });

    if (res[1] != 200) {
      return null;
    }

    const invs = res[2] as Array<InventoryInfo>;
    if (invs.length == 0) {
      return null;
    }

    const inv = invs[0];

    const items = {} as Record<string, InventoryItem>;

    res = DB.Query('inventoryitem/getlist', {
      inventory_id: inv.id,
    });

    const resitems = res[2] as Record<string, InventoryItemInfo>;

    // load inventory items
    if (res[1] == 200) {
      for (const v of Object.values(resitems)) {
        items[v.id] = new InventoryItem();
        items[v.id].extra = JSON.parse(v.extra);
        items[v.id].uid = v.id;
        items[v.id].amount = v.amount;
        items[v.id].template_id = v.item_id;
        items[v.id].Update();
      }
    }

    Inventories[category][identifier] = {
      id: inv.id,
      category: category,
      identifier: identifier,
      title: inv.title || '',
      maxWeight: inv.max_weight || 100.0,
      weight: inv.current_weight || 0.0,
      width: inv.width || 1,
      height: inv.height || 1,
      singleItem: inv.single_item || false,
      actionGroup: inv.action_group || 'default',
      items: items,
      areas: JSON.parse(inv.areas) || {},
    };

    for (const [k, v] of Object.entries(extra)) {
      Inventories[category][identifier][k] = v;
    }

    for (const item of Object.values(items)) {
      const itemType = ItemTypes[item.category];
      if (itemType && itemType.onAdd) {
        itemType.onAdd(item, Inventories[category][identifier]);
      }

      ItemMap[item.uid] = Inventories[category][identifier];
    }

    Inventories[category][identifier].Update();

    return Inventories[category][identifier];
  }

  static Get(category: string, identifier: string): Inventory {
    assert(category);
    assert(identifier);

    if (!Inventories[category]) {
      Inventories[category] = {};
    }

    if (Inventories[category][identifier]) {
      return Inventories[category][identifier];
    }

    return Inventory.LoadFromDB(category, identifier);
  }

  static GetByItemId(id: string): Inventory {
    return ItemMap[id];
  }

  static Create(category: string, identifier: string, replace = false, extra: InventoryItemExtra = {}): Inventory {
    if (!replace) {
      const prevInventory = Inventory.Get(category, identifier);
      if (prevInventory) {
        return prevInventory;
      }
    }

    if (!Inventories[category]) {
      Inventories[category] = {};
    }

    const res = DB.Query('inventory/create', {
      category: category,
      identifier: identifier,
      title: extra.title || '',
      current_weight: 0.0,
      max_weight: extra.maxWeight || 100.0,
      width: extra.width || 0,
      height: extra.height || 0,
      single_item: extra.singleItem || false,
      action_group: extra.actionGroup || 'default',
      areas: JSON.stringify(extra.areas) || '{}',
    });

    if (res[1] != 200) {
      Log.error(`Unable to create inventory ${category}/${identifier}`);
      Log.error(res[2]);
      return null;
    }

    return Inventory.Get(category, identifier);
  }

  DBUpdateItem(item: InventoryItem): boolean {
    assert(item);
    assert(item.uid);

    const extra = GetItemExtra(item);

    const res = DB.Query('inventoryitem/update', {
      id: item.uid,
      inventory_id: this.id,
      x: item.x ?? 0,
      y: item.y ?? 0,
      amount: item.amount,
      extra: JSON.stringify(extra),
    });

    if (res[1] != 200) {
      Log.error('Unable to update item!');
      Log.error(res);
      return false;
    }

    return true;
  }

  Update(): boolean {
    // FIXME
    /*
        inv.collision = Collision.Get(inv)
        inv.weight = GetWeight(inv)
        inv.cash = Cash.Update(inv)
        inv.keys = Keys.Update(inv)
        */

    if (this.category == 'player-inventory') {
      const player = Players.ByIdentifier(this.identifier);
      if (player) {
        player.state['money:cash'] = this.cash;
      }
    }

    const nestedInvs = this.GetNested();

    this.nested.forEach(inv => {
      inv.parent = null;
    });

    this.nested = [];

    for (const nestedInv of Object.values(nestedInvs)) {
      this.nested.push(nestedInv);
      nestedInv.parent = this;
    }

    if (this.parent) {
      this.parent.Update();
    }

    DB.Query('inventory/update', {
      category: this.category,
      identifier: this.identifier,
      current_weight: this.weight,
      max_weight: this.maxWeight,
    });

    TriggerClientEvent('inventory:updateInventory', -1, this);
    TriggerEvent('inventory:onInventoryUpdate', this);

    return true;
  }

  Search(query: InventoryItemQuery): Record<string, InventoryItem> {
    const res = {};

    for (const [uid, item] of Object.entries(this.items)) {
      if (item.Match(query)) {
        res[uid] = item;
      }
    }

    return res;
  }

  SearchWithNested(query: InventoryItemQuery): Record<string, InventoryItem> {
    const res = this.Search(query);

    const nestedInvs = this.GetNested();
    for (const ninv of Object.values(nestedInvs)) {
      const items = ninv.Search(query);
      for (const [a, b] of Object.entries(items)) {
        res[a] = b;
      }
    }

    return res;
  }

  SearchFirst(query: InventoryItemQuery): InventoryItem {
    assert(query);

    for (const item of Object.values(this.items)) {
      if (item.Match(query)) {
        return item;
      }
    }

    return null;
  }

  GetNested(): Record<string, Inventory> {
    const res = {};

    if (this.category == 'player-inventory') {
      for (const item of Object.values(this.items)) {
        if (item.extra && typeof item.extra == 'object' && item.extra.inventory) {
          const itemInv = Inventory.Get(`item-${item.name}`, item.extra.inventory);

          if (itemInv) {
            res[itemInv.id] = itemInv;
          }
        }
      }
    }

    return res;
  }

  SetItemPos(itemUid: number, pos: Vector2): [boolean, string] {
    assert(itemUid);
    assert(pos);

    const item = this.items[itemUid];

    if (!item) {
      return [false, `Item with uid '${itemUid}' not found`];
    }

    item.x = pos.x;
    item.y = pos.y;
    this.UpdateItem(item);
    return [true, null];
  }

  AddItem(item: InventoryItem, amount: number, silent = false, autoStack = true): InventoryItem {
    assert(item);
    assert(amount);

    if (amount < 0) {
      return null;
    }

    if (this.maxWeight && this.weight + amount * (item.weight || 0) > this.maxWeight) {
      return null;
    }

    let olditem = null;
    if (item.uid) {
      olditem = this.items[item.uid];
    }

    if (autoStack && !olditem) {
      olditem = this.SearchFirst({ name: item.name, extra: item.extra });
    }

    if (olditem) {
      this.items[olditem.uid].amount += amount;
      this.DBUpdateItem(this.items[olditem.uid]);
    } else {
      item.amount = amount;

      const extra = GetItemExtra(item);

      item.width = item.width || 1;
      item.height = item.height || 1;

      if (
        item.x == null ||
        item.y == null ||
        this.Collision.ItemsInArea(item.x, item.y, item.width, item.height).length > 0
      ) {
        const [x, y] = this.Collision.FindFittingArea(item);
        item.x = x;
        item.y = y;

        if (item.x == null || item.y == null) {
          // инвентарь переполнен
          return null;
        }
      }

      const res = DB.Query('inventoryitem/create', {
        item_id: item.template_id,
        inventory_id: this.id,
        x: item.x || 0,
        y: item.y || 0,
        amount: item.amount,
        extra: JSON.stringify(extra),
      });

      if (res[1] != 200) {
        Log.error(`Unable to add item! ${res}`);
        return null;
      }

      const itemResponse = res[2];
      if (itemResponse) {
        item.uid = itemResponse.id;
        ItemMap[item.uid] = this;
        const itemType = ItemTypes[item.category];
        if (itemType && itemType.onAdd) {
          itemType.onAdd(item, this);
        }
      } else {
        Log.error(`Incorrect item response: ${res[2]}`);
      }

      assert(item.uid);

      this.items[item.uid] = item;
    }

    this.Update();
    TriggerClientEvent('inventory:onItemAdd', -1, this, item, amount, silent || false);
    return item;
  }

  RemoveItem(query: InventoryItemQuery, amount: number, silent = false): boolean {
    assert(query);
    assert(amount == null || amount > 0);

    const item = this.SearchFirst(query);

    if (!item || !item.uid || !this.items[item.uid]) {
      return false;
    }

    if (amount > 0 && item.amount > amount) {
      item.amount -= amount;
      this.DBUpdateItem(item);
    } else if (!amount || (amount && item.amount == amount)) {
      DB.Query('inventoryitem/delete', {
        inventory_id: this.id,
        id: item.uid,
      });

      ItemMap[item.uid] = null;
      this.items[item.uid] = null;
    } else {
      return false;
    }

    this.Update();
    TriggerClientEvent('inventory:onItemRemove', -1, this, item, amount, silent || false);
    return true;
  }

  TransferItem(query: InventoryItemQuery, amount = 1, inv2: Inventory, silent = false, position: Vector2): boolean {
    assert(query);
    assert(amount == null || amount > 0);
    assert(inv2);

    const item = this.SearchFirst(query);

    if (!item || !item.uid) {
      return false;
    }

    // перевес
    if (inv2.maxWeight && inv2.weight + amount * (item.weight ?? 0) > inv2.maxWeight) {
      return false;
    }

    // избавляемся от самопоглощающихся сумок
    if (item.extra && typeof item.extra == 'object' && item.extra.inventory) {
      const nestedInv = Inventory.Get(`item-${item.category}`, item.extra.inventory);
      if (nestedInv.id == inv2.id) {
        return false;
      }
    }

    if (!position || position.x == null || position.y == null) {
      const [itemx, itemy] = inv2.Collision.FindFittingArea(item);

      if (itemx == null || itemy == null) {
        // инвентарь переполнен
        return false;
      }

      item.x = itemx;
      item.y = itemy;
    } else {
      item.x = position.x;
      item.y = position.y;
    }

    this.items[item.uid] = null;
    inv2.items[item.uid] = item;
    ItemMap[item.uid] = inv2;

    ItemMap[item.uid] = Inventories[inv2.category][inv2.identifier];

    inv2.UpdateItem(item);
    this.Update();

    let parentBagInv = ItemMap[+this.identifier];
    /*
    if (parentBagInv) {
      parentBagInv = Inventory.Get(parentBagInv.category, parentBagInv.identifier);
      const parentBagItem = parentBagInv.SearchFirst({ uid = tonumber(inv2.identifier) });

      if (parentBagItem) {
        parentBagItem.weight = 0.5 + inv2.weight;
        parentBagInv.UpdateItem(parentBagItem);
      }
    }
*/
    if (parentBagInv) {
      parentBagInv = Inventory.Get(parentBagInv.category, parentBagInv.identifier);
      const parentBagItem = parentBagInv.SearchFirst({ uid: +this.identifier });

      if (parentBagItem) {
        parentBagItem.weight = 0.5 + this.weight;
        this.UpdateItem(parentBagInv, parentBagItem);
      }
    }

    TriggerClientEvent('inventory:onItemRemove', -1, this, item, amount, silent || false);
    TriggerClientEvent('inventory:onItemAdd', -1, inv2, item, amount, silent || false);

    return true;
    /*
    const newitem = Item.Duplicate(item)

    if (AddItem(inv2, newitem, amount, silent)) {
        if (!RemoveItem(inv1, item, amount, silent)) {
            RemoveItem(inv2, newitem, amount, silent)
            return null
        else
            return newitem
        }
    }
    */
  }

  UpdateItem(item: InventoryItem, silent = false): boolean {
    assert(item);

    if (!item || !this.items[item.uid]) {
      return false;
    }

    item = item.Update();
    this.items[item.uid] = item;
    this.DBUpdateItem(item);

    this.Update();
    TriggerClientEvent('inventory:onItemUpdate', -1, this, item, silent);
    return true;
  }

  static MergeItems(
    player: Player,
    inv1: Inventory,
    item1: InventoryItem,
    inv2: Inventory,
    item2: InventoryItem,
  ): boolean {
    assert(player);
    assert(inv1);
    assert(item1);
    assert(inv2);
    assert(item2);

    const itemType = ItemTypes[item1.category];
    if (itemType && itemType.merge) {
      return itemType.merge(player, inv1, item1, inv2, item2);
    }
    return ItemTypes.custom.merge(player, inv1, item1, inv2, item2);
  }

  RunItemAction(player: Player, query: InventoryItemQuery, action_name: string): boolean {
    assert(player);
    assert(query);
    assert(action_name);

    if (!action_name) {
      Log.error('action_name is null');
      return false;
    }

    const item = this.SearchFirst(query);
    if (!item) {
      return false;
    }

    const actions = item.actions[this.actionGroup || this.category];
    if (!actions || !actions[action_name]) {
      Log.error(`Action "${action_name}" for (category "${this.category}" not found!`);
      return false;
    }

    const action = actions[action_name];

    if (action.action) {
      TriggerEvent(action.action, player, this, item);
    }

    const itemType = ItemTypes[item.category];

    if (itemType && itemType.getActions) {
      item.actions = itemType.getActions(item);
    }

    if (itemType && itemType.getDescription) {
      item.description = itemType.getDescription(item);
    }

    return true;
  }

  GetWeight(): number {
    let weight = 0;
    for (const item of Object.values(this.items)) {
      weight += (item.weight || 0) * item.amount;
    }
    return weight;
  }
}

/*
ESX.RegisterServerCallback('inventory:getInventory', function(source, cb, category, identifier) {
    cb(Inventory.Get(category, identifier))
}) */
