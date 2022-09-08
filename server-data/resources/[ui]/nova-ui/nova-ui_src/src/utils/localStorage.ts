import T from '~m/Inventory/types';

class LocalStoreProto {
  static readonly storagePrefix = 'react-ui-';

  getItem(key, defaultValue) {
    try {
      return JSON.parse(localStorage.getItem(LocalStoreProto.storagePrefix + key)) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  setItem(key, val) {
    return localStorage.setItem(LocalStoreProto.storagePrefix + key, JSON.stringify(val));
  }

  clear() {
    localStorage.clear();
  }

  getInventoryPos(inventory: T.Inventory) {
    return this.getItem(`pos: ${inventory.category}/${inventory.identifier}`, { x: 20, y: 20 });
  }

  setInventoryPos(inventory: T.Inventory) {
    this.setItem(`pos: ${inventory.category}/${inventory.identifier}`, {
      x: inventory.x,
      y: inventory.y,
    });
  }
}

const LocalStore = new LocalStoreProto();

export default LocalStore;
