import * as T from 'types';

export function defaultCertificate(): T.Certificate {
  return {
    id: -2,
    firstname: '',
    lastname: '',
    date: new Date(),
    expireDate: new Date(),
    category: T.CertificateCategory.IDCard,
    author: '',
    isRevoked: false,
  };
}

export function IDCard(): T.CertificateIDCard {
  return {
    ...defaultCertificate(),
    age: 18,
    sex: 0,
    photo: `${ASSETS}/img/person.jpg`,
    drivingLicenses: {},
    weaponLicenses: {},
  };
}

export function Document(): T.CertificateDocument {
  return {
    ...defaultCertificate(),
    organization: 'police',
    text: '',
    title: '',
    category: T.CertificateCategory.Document,
    author: 'L`e Broosh`Eagl`e',
  };
}

export function PassKey(): T.CertificatePassKey {
  return {
    ...defaultCertificate(),
    role: '', // FIXME
    organization: 'police',
    category: T.CertificateCategory.PassKey,
    grade: 0,
  };
}

export function Fine(): T.CertificateFine {
  return {
    ...defaultCertificate(),
    category: T.CertificateCategory.Fine,
    fineAmount: 2000,
    lawId: 111,
    text: '',
    author: 'L`e Broosh`Eagl`e',
  };
}
