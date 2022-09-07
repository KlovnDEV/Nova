import { observable } from 'mobx';

class PayFormStorageProto {
  @observable bank = 0;

  @observable cash = 0;
}

export const PayFormStorage = new PayFormStorageProto();
