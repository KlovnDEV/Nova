import { observable, makeAutoObservable, action } from 'mobx';
// types
import * as T from 'types';
// utils
import { API, error } from 'utils';

class StateProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable assets = {} as {
    wanted: Promise<any>;
    unpaid: Promise<any>;
  };

  @observable orgName: string;

  @observable wanted = null;

  @observable unpaid = null;

  @action updateEMS = (name: string): void => {
    this.orgName = name;
    // FIXME fetch unpaid
    this.assets.unpaid = API.query('asd', {
      status: T.PersonStatus.Wanted,
    }).then(response => {
      this.unpaid = response.data;
      return response;
    });

    this.assets.wanted = API.query('cad/person/search', {
      status: T.PersonStatus.Wanted,
    }).then(response => {
      this.wanted = response.data;
      return response;
    });
  };
}

export default new StateProto();
