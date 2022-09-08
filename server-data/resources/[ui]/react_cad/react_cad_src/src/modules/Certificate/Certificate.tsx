/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
// components
import { Preloader, Card, CardHeader } from 'components';
import { Select, Box } from 'libs/UI';
import { zeroPad, generateAsDataField, Icons } from 'utils';
import { MainStore } from 'storage/MainStore';
import * as T from 'types';
import {
  CertificateIDCard,
  CertificateDocument,
  CertificatePassKey,
  CertificateFine,
} from './Components';
// views
import { IDCard, Document, PassKey, Fine } from './Views';
// styles
import s from './Certificate.module.scss';
// utils
import State from './State';
// types

const categories = [
  {
    label: 'Выберите категорию',
    value: -1,
    hidden: true,
  },
  {
    label: 'Идентификационная карта',
    value: T.CertificateCategory.IDCard,
  },

  {
    label: 'Документ',
    value: T.CertificateCategory.Document,
  },
  {
    label: 'Штраф',
    value: T.CertificateCategory.Fine,
  },
  {
    label: 'Ключ доступа',
    value: T.CertificateCategory.PassKey,
  },
];

const CertificateProto = ({ orgName, id }: { orgName: string; id: number }) => {
  const orgPermissions = MainStore.permissions[orgName];
  const editable = orgPermissions?.certificates?.edit;

  const asDataField = generateAsDataField(State.CertificateData, (fieldname, value) => {
    if (fieldname === 'id') {
      if (value < 0) return '';
      return zeroPad(value, 8);
    }

    return value;
  });

  const onPhoto = (url: string): void => {
    State.IDCard.photo = url;
  };

  return (
    <Card
      flex="column top left"
      elevation={0}
      header={
        <CardHeader
          labelText={id == -1 ? 'Новый документ' : `Документ №${id}`}
          actions={
            editable
              ? [
                  {
                    text: 'Сохранить',
                    icon: Icons.Save,
                    onClick: () => State.saveCertificate(),
                  },
                ]
              : []
          }
        />
      }
    >
      <div className={s.Grid}>
        <div>
          <Card>
            <div className={s.CertificateRow}>
              <Select
                name="category"
                options={categories}
                label="Выберите тип документа"
                {...asDataField('category', !editable)}
              />
              <label className={s.Checkbox} htmlFor="check">
                <input
                  type="checkbox"
                  name="check"
                  checked={State.CertificateData.isRevoked}
                  onChange={e => {
                    State.CertificateData.isRevoked = e.target.checked;
                  }}
                />
                Отозвано
              </label>
            </div>
            {State.CertificateData.category == T.CertificateCategory.IDCard && (
              <CertificateIDCard State={State} editable={editable} onPhoto={onPhoto} />
            )}
            {State.CertificateData.category == T.CertificateCategory.Document && (
              <CertificateDocument State={State} editable={editable} />
            )}
            {State.CertificateData.category == T.CertificateCategory.PassKey && (
              <CertificatePassKey State={State} editable={editable} />
            )}
            {State.CertificateData.category == T.CertificateCategory.Fine && (
              <CertificateFine State={State} editable={editable} />
            )}
          </Card>
        </div>
        <Box flex="row center">
          {State.CertificateData.category == T.CertificateCategory.IDCard && (
            <IDCard
              firstname={State.IDCard.firstname}
              lastname={State.IDCard.lastname}
              age={State.IDCard.age}
              sex={State.IDCard.sex}
              photo={State.IDCard.photo}
              drivingLicenses={State.IDCard.drivingLicenses}
              weaponLicenses={State.IDCard.weaponLicenses}
            />
          )}
          {State.CertificateData.category == T.CertificateCategory.Document && (
            <Document
              firstname={State.Document.firstname}
              lastname={State.Document.lastname}
              author={State.Document.author}
              organization={State.Document.organization}
              title={State.Document.title}
              text={State.Document.text}
              date={State.Document.date}
            />
          )}
          {State.CertificateData.category == T.CertificateCategory.PassKey && (
            <PassKey
              firstname={State.PassKey.firstname}
              lastname={State.PassKey.lastname}
              organization={State.PassKey.organization}
              grade={State.PassKey.grade}
              id={State.PassKey.id}
            />
          )}
          {State.CertificateData.category == T.CertificateCategory.Fine && (
            <Fine
              firstname={State.Fine.firstname}
              lastname={State.Fine.lastname}
              lawId={State.Fine.lawId}
              fineAmount={State.Fine.fineAmount}
              author={State.Fine.author}
              date={State.Fine.date}
              text={State.Fine.text}
            />
          )}
        </Box>
      </div>
    </Card>
  );
};

const CertificateBody = observer(CertificateProto);

const Certificate = observer(({ id, orgName }) => {
  useEffect(() => {
    State.updateCertificate(id);
  }, [id]);

  return (
    <div className={s.Wrapper}>
      <Preloader
        event={State.assets.certificate}
        success={CertificateBody}
        orgName={orgName}
        id={id}
      />
    </div>
  );
});

export { Certificate };
export default Certificate;
