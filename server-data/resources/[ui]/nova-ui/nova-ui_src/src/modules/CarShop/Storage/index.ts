import { makeAutoObservable, observable, action, computed } from 'mobx';
import { genRandom } from 'utils';

export interface ICategory {
  label: string;
  icon: string;
  items: IItem[];
}

export interface IItem {
  name: string;
  colors?: { a: string | number; b: string }[];
  grades?: { a: string | number; b: string }[];
  price: number;
}

class MechCarStorageProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable categories: Record<string, ICategory> = {
    super: {
      label: 'Суперкары',
      icon: 'car_super',
      items: [
        {
          name: 'Lamborghini Murcielago',
          price: 1000,
          colors: genRandom(),
        },
        {
          name: 'Lamborghini Centenario',
          price: 1000,
          colors: genRandom(),
        },
        {
          name: 'Grotti',
          price: 1000,
          colors: genRandom(),
        },
        {
          name: 'Ford GTS',
          price: 1000,
          colors: genRandom(),
        },
        {
          name: 'Bugatti',
          price: 1000,
          colors: genRandom(),
        },
      ],
    },
    sport: {
      label: 'Спорт',
      icon: 'car_sport',
      items: [
        {
          name: 'Ocelot Jugular',

          price: 1000,
        },
        {
          name: 'Issi Sport',

          price: 1000,
        },
      ],
    },
  };

  @observable currentCategory: string = undefined;

  @computed get categoryItems(): {
    name?: string;
    icon: string;
  }[] {
    const current = this.categories[this.currentCategory];

    if (!current) return [];

    return current.items.map(item => ({ ...item, icon: current.icon }));
  }

  @observable currentItem = undefined;
}

const Storage = new MechCarStorageProto();

export default Storage;
