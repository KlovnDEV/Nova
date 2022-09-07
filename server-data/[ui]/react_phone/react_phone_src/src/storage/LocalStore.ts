class LocalStoreProto {
  static storagePrefix = 'react-phone-';

  getItem(key: string, defaultValue: any) {
    try {
      return JSON.parse(localStorage.getItem(LocalStoreProto.storagePrefix + key)) || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  setItem(key: string, value: any) {
    return localStorage.setItem(LocalStoreProto.storagePrefix + key, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }
}

const LocalStore = new LocalStoreProto();

export default LocalStore;
