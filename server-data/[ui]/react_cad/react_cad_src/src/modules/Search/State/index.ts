import { observable, makeAutoObservable, action } from 'mobx';
// types
import { API, error } from 'utils';
import * as T from 'types';

class StateProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable Persons: Array<T.Person> | null = null;

  @observable firstname = '';

  @observable lastname = '';

  @observable phone = '';

  @action onSearch = (orgName: string): Promise<boolean> =>
    API.query('cad/person/search', {
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
    })
      .then(response => {
        const res = response.data;

        if (orgName === 'ambulance') {
          res.forEach(p => {
            if (p.status !== T.PersonStatus.Dead) {
              // eslint-disable-next-line no-param-reassign
              p.status = T.PersonStatus.Alive;
            }
          });
        }

        this.Persons = res;

        return true;
      })
      .catch(e => {
        error(`Ошибка поиска! ${e}`);
        return false;
      });
}

export default new StateProto();
