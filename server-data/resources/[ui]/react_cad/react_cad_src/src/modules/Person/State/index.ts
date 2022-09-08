import { observable, makeAutoObservable, action } from 'mobx';
// types
import * as T from 'types';
// utils
import { API, zeroPad, warn, error, success } from 'utils';
import { Person } from './person';

interface History {
  push(url: string): void;
}

class StateProto {
  #recordsPromise;

  constructor() {
    makeAutoObservable(this);
  }

  @observable assets = {} as {
    person: Promise<any>;
  };

  @observable Person: T.Person = { ...Person() };

  @observable Cases: Array<T.Record> = undefined;

  @observable Violations: Array<T.Violation> = undefined;

  @observable IllnesList: Array<T.Record> = undefined;

  @observable Certificates: Array<T.Certificate> = undefined;

  @observable status: number = T.PersonStatus.Alive;

  @action violationCloseHandler = (
    event: MouseEvent,
    data: { id: number },
  ): Promise<T.APIResponse> => {
    return API.query('cad/violations/close', { id: data.id }).then(response => {
      const violations = [...this.Violations];

      const vid = violations.findIndex(e => e.id === data.id);
      if (violations[vid]) violations[vid].closed = true;
      this.Violations = violations;

      return response;
    });
  };

  fetchPersonCertificates = (): void => {
    API.query('certificates/list', {})
      .then(response => {
        this.Certificates = [...response.data];

        return true;
      })
      .catch(e => {
        error(`Ошибка загрузки документа! ${e}`);
      });
  };

  fetchPersonAmbulance = (): void => {
    this.#recordsPromise
      .then((responseInner: T.APIResponse) => {
        this.IllnesList = responseInner.data;

        return true;
      })
      .catch(e => error(`Ошибка загрузки истории болезни! ${e}`));
  };

  fetchPersonPolice = (): void => {
    this.#recordsPromise.then(response2 => {
      this.Cases = response2.data.map(c => {
        const elem = c;
        elem.idPadded = zeroPad(c.id, 8);
        return elem;
      });

      API.query('cad/violations/list', {
        firstname: this.Person.firstname,
        lastname: this.Person.lastname,
      })
        .then(response3 => {
          this.Violations = response3.data;

          return true;
        })
        .catch(e => error(`Ошибка загрузки списка нарушений! ${e}`));

      return true;
    });
  };

  @action fetchPerson = (orgName: string, id: number): Promise<boolean> => {
    if (id < 0) return new Promise(r => r(true));

    return API.query('cad/person/get', { id })
      .then(response => {
        this.Person = { ...response.data[0] };
        this.status = this.Person.status;

        this.#recordsPromise = API.query('cad/participants/byname', {
          organization: orgName,
          firstname: this.Person.firstname,
          lastname: this.Person.lastname,
        }).catch(e => error(`Ошибка загрузки списка участников дела! ${e}`));

        if (orgName === 'police') {
          this.fetchPersonPolice();
        }

        if (orgName === 'ambulance') {
          this.fetchPersonAmbulance();
        }

        this.fetchPersonCertificates();

        return true;
      })
      .catch(e => {
        error(`Ошибка загрузки персоны! ${e}`);
        return false;
      });
  };

  @action updatePerson = (orgName: string, id: number) => {
    this.assets.person = this.fetchPerson(orgName, id);
  };

  @action savePerson = async (personid: number, history: History): Promise<boolean> => {
    if (this.Person.firstname.length === 0) {
      warn('Необходимо заполнить имя!');
      return false;
    }
    if (this.Person.lastname.length === 0) {
      warn('Необходимо заполнить фамилию!');
      return false;
    }
    if (this.Person.age < 18 || this.Person.age > 99) {
      warn('Возраст должен быть от 18 до 99 лет!');
      return false;
    }

    if (personid < 0) {
      API.query('cad/person/create', this.Person)
        .then(response => {
          const respId = response?.data?.id;
          if (respId) {
            history.push(`/police/person/${respId}`);
          } else {
            warn(`Идентификатор личности не найден! Запрос: ${response}`);
          }
        })
        .catch(e => {
          error(`Невозможно сохранить дело! Ошибка: ${e}`);
        });
    } else {
      API.query('cad/person/update', this.Person)
        .then(() => {
          success('Дело успешно обновлено!');
        })
        .catch(e => error(`Невозможно обновить дело! Ошибка: ${e}`));
    }

    return true;
  };

  @action deletePerson = (personId: string): Promise<T.APIResponse> => {
    console.log(personId);
    return API.query('cad/person/delete', { id: personId });
  };
}

export default new StateProto();
