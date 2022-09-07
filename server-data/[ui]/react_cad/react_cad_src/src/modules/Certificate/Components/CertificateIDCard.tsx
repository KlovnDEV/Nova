// core
import React from 'react';
import { observer } from 'mobx-react';
// components
import { TextField, Select } from 'libs/UI';
// utils
import { generateAsDataField, API } from 'utils';
// store
import { MainStore } from 'storage/MainStore';
// types
import { ICertificate } from '../types';
// styles
import s from '../Certificate.module.scss';

const Checkbox = (props: {
  name: string;
  label: string;
  State: AnyObject;
  licenseType: string;
}) => {
  const { name, label, State, licenseType } = props;
  return (
    <label className={s.Checkbox} htmlFor={name}>
      <input
        type="checkbox"
        name={name}
        checked={!!State.IDCard[licenseType][name]}
        onChange={e => {
          State.IDCard[licenseType] = {
            ...State.IDCard[licenseType],
            [name]: e.target.checked,
          };
        }}
      />
      {label}
    </label>
  );
};

const IDCard = ({ State, editable, onPhoto }: ICertificate): JSX.Element => {
  const asDataField = generateAsDataField(State.IDCard, (fieldname, value) => {
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
              label: 'Выберите пол',
              value: -1,
              hidden: true,
            },
            {
              label: 'М',
              value: 0,
            },
            {
              label: 'Ж',
              value: 1,
            },
          ]}
          {...asDataField('sex', !editable)}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Возраст"
          {...asDataField('age', !editable)}
        />
      </div>
      <div className={s.CertificateRowSingle}>
        <span>Водительские лицензии:</span>
      </div>
      <div className={s.CertificateRowCheckboxes}>
        <Checkbox
          licenseType="drivingLicenses"
          name="car"
          label="Легковой автомобиль"
          State={State}
        />
        <Checkbox licenseType="drivingLicenses" name="moto" label="Мотоцикл" State={State} />
        <Checkbox licenseType="drivingLicenses" name="heli" label="Вертолет" State={State} />
        <Checkbox licenseType="drivingLicenses" name="plane" label="Самолет" State={State} />
        <Checkbox licenseType="drivingLicenses" name="boat" label="Лодка" State={State} />
      </div>
      <div className={s.CertificateRowSingle}>
        <span>Лицензии на оружие:</span>
      </div>
      <div className={s.CertificateRowCheckboxes}>
        <Checkbox licenseType="weaponLicenses" name="pistol" label="Пистолеты" State={State} />
        <Checkbox licenseType="weaponLicenses" name="rifle" label="Винтовки" State={State} />
        <Checkbox licenseType="weaponLicenses" name="heavy" label="Тяжелое оружие" State={State} />
        <Checkbox licenseType="weaponLicenses" name="melee" label="Холодное оружие" State={State} />
      </div>
      <div className={s.CertificateRow}>
        <button
          type="button"
          className={s.Button}
          onClick={() => {
            MainStore.photoMode = true;
            MainStore.onPhotoHandler = onPhoto;
            API.query('takePhotoStart', {});
          }}
        >
          Сделать фото
        </button>
      </div>
    </>
  );
};

export const CertificateIDCard = observer(IDCard);
export default observer(IDCard);
