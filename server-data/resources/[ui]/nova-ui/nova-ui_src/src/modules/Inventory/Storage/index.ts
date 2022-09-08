import API from 'API';
import { observable, computed, action, makeAutoObservable } from 'mobx';
import LocalStorage from 'utils/LocalStorage';
import AppStorage from '~m/App/Storage';
import T from '~m/Inventory/types';

class InventoryStoreProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable invs = {} as T.Inventories;

  @computed get inventories(): T.Inventories {
    return this.invs;
  }

  @action setInventories(newInventories: T.Inventories): void {
    Object.entries(newInventories).forEach(([id, inv]) => {
      this.setInventory({ id: id, inventory: inv });
    });
  }

  @action setInventory({ id, inventory }: { id: string | number; inventory: T.Inventory }): void {
    if (id === undefined) {
      throw Error('setInventory with NULL id!');
    }

    if (!this.invs[id]) {
      this.invs[id] = { ...inventory };
    } else {
      Object.assign(this.invs[id], inventory);
    }
  }

  @action setInventoryFocus(id: string | number): void {
    Object.keys(this.invs).forEach(key => {
      this.invs[key].focused = false;
    });

    this.invs[id].focused = true;
  }

  @action setInventoryPosition({ id, x, y }: { id: string; x: number; y: number }): boolean {
    if (id === undefined) {
      throw Error('setInventoryPosition with NULL id!');
    }

    if (!this.invs[id]) {
      throw Error('setInventoryPosition with non-existant inventory!');
    }

    this.invs[id].x = Math.min(Math.max(x, 0), window.innerWidth - this.invs[id].width * 16);
    this.invs[id].y = Math.min(Math.max(y, 0), window.innerHeight - this.invs[id].height * 16);

    LocalStorage.setInventoryPos(this.invs[id]);

    this.setInventoryFocus(id);

    return true;
  }

  @action setInventoryOpen(id: string | number, open: boolean): void {
    if (id === undefined) {
      throw Error('closeInventory with NULL id!');
    }

    if (!this.invs[id]) {
      throw Error('Inventory no exists!');
    }

    this.invs[id].open = open;
  }

  @action deleteInventory(id: string | number) {
    delete this.invs[id];
  }

  onItemMove = (
    invidFrom: string | number,
    invidTo: string | number,
    itemid: string | number,
    x: number,
    y: number,
  ): void => {
    // console.log(invidFrom, invidTo, itemid, x, y);

    if (!invidFrom || !invidTo) {
      console.error('Inventory id not found!');
      return;
    }

    const inventoriesCopy = this.inventories;
    const invFrom = inventoriesCopy[invidFrom];

    // drop to background
    if (invidTo === -1) {
      API.query('inventory_item_drop', {
        inventory: { category: invFrom.category, identifier: invFrom.identifier },
        uid: itemid,
        x: x,
        y: y,
      });
      return;
    }

    const invTo = inventoriesCopy[invidTo];

    if (!invFrom || !invTo) {
      console.error('Inventory not found!');
      return;
    }

    const item = invFrom.items[itemid];

    // если итем пропал до окончания перетаскивания
    if (!item) {
      console.error('Wrong item!');
      return;
    }

    if (invTo.singleItem) {
      if (x < 0 || y < 0 || invTo.width <= x || invTo.height <= y) {
        console.error('Wrong coordinates!');
        return;
      }
    } else if (x < 0 || y < 0 || invTo.width < x + item.width || invTo.height < y + item.height) {
      console.error('Wrong coordinates!');
      return;
    }

    if (invidFrom !== invidTo) {
      if (
        invTo.allowedCategories &&
        invTo.allowedCategories.length > 0 &&
        !invTo.allowedCategories.includes(item.category)
      ) {
        return;
      }
      item.x = x;
      item.y = y;
      if (process.env.NODE_ENV === 'production') {
        delete invFrom.items[itemid];
      } else {
        invTo.items[itemid] = item;
        delete invFrom.items[itemid];
        this.setInventory({ id: invidTo, inventory: invTo });
      }
      this.setInventory({ id: invidFrom, inventory: invFrom });

      API.query('inventory/item/move', {
        from: { category: invFrom.category, identifier: invFrom.identifier },
        to: { category: invTo.category, identifier: invTo.identifier },
        uid: itemid,
        x: x,
        y: y,
        shift: AppStorage.isShiftDown,
        ctrl: AppStorage.isCtrlDown,
      })
        .then(({ data }) => {
          if (data === true) {
            invTo.items[itemid] = item;
            this.setInventory({ id: invidTo, inventory: invTo });
          }
        })
        .catch(function () {
          /* do nothing */
        });
    } else {
      item.x = x;
      item.y = y;
      this.setInventory({ id: invidTo, inventory: invTo });

      API.query('inventory_item_move', {
        from: { category: invFrom.category, identifier: invFrom.identifier },
        to: { category: invTo.category, identifier: invTo.identifier },
        uid: itemid,
        x: x,
        y: y,
        shift: AppStorage.isShiftDown,
        ctrl: AppStorage.isCtrlDown,
      })
        .then(({ data }): void => {
          if (data === true) {
            /* do nothing */
          }
        })
        .catch(function (): void {
          /* do nothing */
        });
    }
  };
}

const InventoryStore = new InventoryStoreProto();

export default InventoryStore;
