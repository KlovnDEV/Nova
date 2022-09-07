import { observable, makeAutoObservable } from 'mobx';

class BankStoreProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable balance = 1234;

  @observable cash = 2345;

  @observable transferAmount = '0';
}

const BankStore = new BankStoreProto();

export default BankStore;
