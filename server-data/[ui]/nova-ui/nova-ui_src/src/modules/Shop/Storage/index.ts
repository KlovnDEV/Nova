import { observable, makeAutoObservable, action, computed } from 'mobx';
import { IShopItem } from '../types';

const randArray = [];
function stringGen(len) {
  let text = '';

  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i += 1)
    text += charset.charAt(Math.floor(Math.random() * charset.length));

  return text;
}
for (let i = 0; i <= 50; i += 1) {
  randArray.push({
    name: stringGen(15),
    displayName: stringGen(25),
    category: Math.random().toString(36).substr(2, 7),
    price: Math.floor(Math.random() * 1000 + 1),
    quantity: Math.floor(Math.random() * 1000 + 1),
    owner: stringGen(20),
    uid: Math.floor(Math.random() * 1000000 + 1),
  });
}

const defArray = [
  {
    name: 'beer',
    displayName: 'Пиво',
    category: 'drink',
    price: 200,
    quantity: Math.floor(Math.random() * 1000000 + 1),
    owner: 'Dan Sadler',
    uid: Math.floor(Math.random() * 1000000 + 1),
  },
  {
    name: 'beer',
    displayName: 'Пиво',
    category: 'drink',
    price: Math.floor(Math.random() * 1000000 + 1),
    quantity: 200,
    owner: 'Dan Sadler',
    uid: Math.floor(Math.random() * 1000000 + 1),
  },
  {
    name: 'berry_juice',
    displayName: 'Ягодный Сок',
    category: 'drink',
    price: Math.floor(Math.random() * 1000000 + 1),
    quantity: 400,
    owner: 'Dan Sadler',
    uid: Math.floor(Math.random() * 1000000 + 1),
  },
  {
    name: 'berry_juice',
    displayName: 'Ягодный Сок',
    category: 'drink',
    price: Math.floor(Math.random() * 1000000 + 1),
    quantity: 400,
    owner: 'Dan Sadler',
    uid: Math.floor(Math.random() * 1000000 + 1),
  },
  {
    name: 'apple',
    displayName: 'Яблоки',
    category: 'food',
    price: Math.floor(Math.random() * 1000000 + 1),
    quantity: 200,
    owner: 'Dan Sadler',
    uid: Math.floor(Math.random() * 1000000 + 1),
  },
];

enum Categories {
  drink = 'Напитки',
  food = 'Еда',
}

class StorageProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable shopId: number;

  @observable Items: IShopItem[] = randArray;

  @observable Warehouse: IShopItem[] = defArray;

  @observable storedItems: Record<string, boolean> = {};

  @observable Search = '';

  @observable Cart: IShopItem[] = [];

  // @observable Money: { cash: number; bank: number } = { cash: 0, bank: 0 };

  @action setSearch = (search: string): void => {
    this.Search = search;
  };

  @action addToCart = (uid: string | number): void => {
    const item = this.Items.find(elem => elem.uid === uid);
    const cartItem = this.Cart.find(elem => elem.uid === item.uid);
    if (!cartItem) {
      this.Cart.push({ ...item, quantity: 1 });
      return null;
    }
    this.Cart = this.Cart.filter(elem => elem.uid !== cartItem.uid);
    return null;
  };

  @action setToStore = (uid: string, value: boolean): void => {
    this.storedItems[uid] = value;
  };

  @action resetStored = () => {
    this.storedItems = {};
  };

  @computed get totalPrice() {
    return this.Cart.reduce((prev, curr) => prev + curr.quantity * curr.price, 0);
  }

  @computed get Menu() {
    const menu = new Set(this.Items.map(item => item.category));
    return Array.from(menu).map(category => ({
      category,
      name: Categories[category] ?? category,
    }));
  }

  @computed get AllItems() {
    this.Warehouse.forEach(item => {
      // eslint-disable-next-line no-param-reassign
      this.storedItems[item.uid] = true;
    });
    return this.Warehouse.concat(this.Items);
  }
}

const Storage = new StorageProto();

export default Storage;
