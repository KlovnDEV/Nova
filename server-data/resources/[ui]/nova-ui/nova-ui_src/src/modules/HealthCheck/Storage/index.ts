import { makeAutoObservable, observable, action, computed } from 'mobx';

export type IDamage = {
  name: string;
  description: string;
  icon: string;
};

export type IRegion = 'head' | 'torso' | 'handR' | 'handL' | 'legR' | 'legL';

enum Sex {
  MALE = 0,
  FEMALE = 1,
}

enum Status {
  OK = 0,
  UNCONSCIOUS = 1,
}

class HealthProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable DamageMap: Record<IRegion, IDamage[]> = {
    head: [
      {
        name: 'Перелом мозга',
        description: 'А голову дома не забыл?',
        icon: 'acid',
      },
    ],
    torso: [
      {
        name: Math.floor(Math.random() * 1000000 + 1).toString(),
        description: Math.floor(Math.random() * 1000000 + 1).toString(),
        icon: 'obed3',
      },
      {
        name: Math.floor(Math.random() * 1000000 + 1).toString(),
        description: '',
        icon: 'yogurt',
      },
      {
        name: Math.floor(Math.random() * 1000000 + 1).toString(),
        description: Math.floor(Math.random() * 1000000 + 1).toString(),
        icon: 'wine',
      },
      {
        name: Math.floor(Math.random() * 1000000 + 1).toString(),
        description: Math.floor(Math.random() * 1000000 + 1).toString(),
        icon: 'wok',
      },
      {
        name: Math.floor(Math.random() * 1000000 + 1).toString(),
        description: Math.floor(Math.random() * 1000000 + 1).toString(),
        icon: 'obed3',
      },
    ],
    handR: [],
    handL: [],
    legR: [],
    legL: [],
  };

  @observable SelectedRegion: IRegion = null;

  @observable PersonInfo = {
    firstname: 'Le',
    lastname: 'Broosh',
    sex: Sex.MALE,
    status: Status.OK,
  };

  @action setSelectedRegion(name: IRegion) {
    this.SelectedRegion = name;
  }
}

const Storage = new HealthProto();

export default Storage;
