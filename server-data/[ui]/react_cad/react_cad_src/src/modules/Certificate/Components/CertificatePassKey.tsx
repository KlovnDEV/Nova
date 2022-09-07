import React from 'react';
// components
import { TextField, Select } from 'libs/UI';
// utils
import { generateAsDataField } from 'utils';
// types
import { ICertificate } from '../types';
// styles
import s from '../Certificate.module.scss';

export const CertificatePassKey = ({ State, editable }: ICertificate): JSX.Element => {
  const asDataField = generateAsDataField(State.PassKey, (fieldname, value) => {
    return value;
  });

  return (
    <>
      <div className={s.CertificateRowEqual}>
        <TextField
          variant="outlined"
          fullWidth
          label="Имя"
          {...asDataField('firstname', !editable)}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Фамилия"
          {...asDataField('lastname', !editable)}
        />
      </div>
      <div className={s.CertificateRowEqual}>
        <Select
          name="sex"
          options={[
            {
              label: 'Выберите уровень доступа',
              value: -1,
              hidden: true,
            },
            {
              label: '0',
              value: 0,
            },
            {
              label: '1',
              value: 1,
            },
            {
              label: '2',
              value: 2,
            },
            {
              label: '3',
              value: 3,
            },
            {
              label: '4',
              value: 4,
            },
          ]}
          {...asDataField('grade', !editable)}
        />
      </div>
    </>
  );
};

export default CertificatePassKey;
