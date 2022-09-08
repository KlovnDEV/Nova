import React from 'react';
// components
import { TextField } from 'libs/UI';
// utils
import { generateAsDataField } from 'utils';
// types
import { ICertificate } from '../types';
// styles
import s from '../Certificate.module.scss';

export const CertificateDocument = ({ State, editable }: ICertificate): JSX.Element => {
  const asDataField = generateAsDataField(State.Document, (fieldname, value) => {
    return value;
  });

  return (
    <>
      <div className={s.CertificateRowEqual}>
        <TextField
          variant="outlined"
          fullWidth
          label="Заголовок"
          {...asDataField('title', !editable)}
        />
      </div>
      <div className={s.CertificateRowEqual}>
        <TextField
          variant="outlined"
          fullWidth
          label="Имя получателя"
          {...asDataField('firstname', !editable)}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Фамилия получателя"
          {...asDataField('lastname', !editable)}
        />
      </div>
      <div className={s.CertificateRowSingle}>
        <textarea rows={16} className={s.Textarea} {...asDataField('text', !editable)} />
      </div>
    </>
  );
};

export default CertificateDocument;
