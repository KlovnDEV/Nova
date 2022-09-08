import { observable, makeAutoObservable, action } from 'mobx';
// utils
import { API, success, error } from 'utils';
import * as T from 'types';
import { IDCard, Document, PassKey, Fine, defaultCertificate } from './certifates';
// types

class StateProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable assets = {} as {
    certificate: Promise<any>;
  };

  @observable CertificateData: T.Certificate | null = null;

  @observable IDCard = IDCard();

  @observable Document = Document();

  @observable PassKey = PassKey();

  @observable Fine = Fine();

  @action fetchCertificate = async (id: number): Promise<any> => {
    if (id == -1) {
      this.CertificateData = { ...defaultCertificate() };
      return new Promise(r => r(true));
    }

    return API.query('certificates/get', { id }).then(response => {
      this.CertificateData = { ...response.data[0] };

      return response;
    });
  };

  @action updateCertificate = (id: number) => {
    this.assets.certificate = this.fetchCertificate(id);
  };

  @action saveCertificate = (): void => {
    API.query('saveCertificate', this.CertificateData)
      .then(() => {
        success('Успешно сохранено!');
      })
      .catch(e => {
        error(`Ошибка сохранения! ${e}`);
      });
  };
}

export default new StateProto();
