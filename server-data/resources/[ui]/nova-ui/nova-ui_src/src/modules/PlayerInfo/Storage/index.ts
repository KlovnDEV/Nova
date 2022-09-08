import { observable, action, makeAutoObservable } from 'mobx';

class StorageProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable phone = '';

  @observable bank = 0;

  @observable cash = 0;

  @observable skills = [];

  @observable slots = [
    {
      id: 1,
      item: undefined,
      invId: undefined,
    },
    {
      id: 2,
      item: undefined,
      invId: undefined,
    },
    {
      id: 3,
      item: undefined,
      invId: undefined,
    },
    {
      id: 4,
      item: undefined,
      invId: undefined,
    },
    {
      id: 5,
      item: undefined,
      invId: undefined,
    },
    {
      id: 6,
      item: undefined,
      invId: undefined,
    },
    {
      id: 7,
      item: undefined,
      invId: undefined,
    },
    {
      id: 8,
      item: undefined,
      invId: undefined,
    },
    {
      id: 9,
      item: undefined,
      invId: undefined,
    },
    {
      id: 0,
      item: undefined,
      invId: undefined,
    },
  ];
}

const Storage = new StorageProto();

export default Storage;
