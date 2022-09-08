import { observable, makeAutoObservable, action } from 'mobx';
// types
import { API, error } from 'utils';
import * as T from 'types';

class StateProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable assets = {} as {
    cases: Promise<any>;
  };

  @observable Cases: Array<T.Record> | null = null;

  @action updateCases = (archive: boolean, organization: string) => {
    this.assets.cases = API.query('cad/record/list', {
      archived: archive ? 1 : 0,
      organization,
    }).then(response => {
      this.Cases = response.data;
      return response;
    });
  };
}

export default new StateProto();
