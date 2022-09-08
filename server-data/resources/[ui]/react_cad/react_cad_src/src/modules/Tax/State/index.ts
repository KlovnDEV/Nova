import { observable, makeAutoObservable, action } from 'mobx';
// utils
import { API, error } from 'utils';
import * as T from 'types';

class StateProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable tax: Array<T.Tax> = [];

  @action setTaxAmount = (value: number, taxName: string): void => {
    const targetTax = this.tax.find(item => item.name === taxName);

    if (targetTax) {
      targetTax.amount = value;
    }
  };

  @action getTaxList = (): Promise<boolean> =>
    API.query('getTaxList', {}).then(res => {
      if (res.status !== 200) {
        error('Ошибка получения данных!');
        return false;
      }

      this.tax = res.data;
      return true;
    });
}

export default StateProto;
