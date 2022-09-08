/* eslint-disable import/prefer-default-export */
import React from 'react';
import { IIDCard } from '../../types';

import s from './IDCard.module.scss';

const IDCard = (props: IIDCard): JSX.Element => {
  const { firstname, lastname, age, sex, photo, drivingLicenses, weaponLicenses } = props;

  const mapLicenses = (license, lookup) =>
    Object.entries(license)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        return lookup[key];
      })
      .join(', ');

  const weaponLicensesString = mapLicenses(weaponLicenses, {
    pistol: 'P',
    rifle: 'R',
    melee: 'M',
    heavy: 'H',
  });

  const drivingLicensesString = mapLicenses(drivingLicenses, {
    boat: 'B',
    car: 'C',
    moto: 'M',
    heli: 'H',
    plane: 'A',
  });

  return (
    <div className={s.Passport} style={{ fontSize: 20 }}>
      <img className={s.PassportBackground} src={`${ASSETS}/img/certs/passport.png`} alt="" />
      <img className={s.QR} src={`${ASSETS}/img/qr-code.png`} alt="" />
      <div className={s.PassportWrapper}>
        <h2 className={s.Header}>Идентификационная карта</h2>
        <p className={s.Subheader}>Штат Лос Сантос</p>
        <div className={s.PassportInner}>
          <div className={s.PassportPhoto}>
            <img className={s.PassportFace} src={photo} alt="" />
            <p className={s.Signature}>{lastname}</p>
          </div>
          <div className={s.PassportInfo}>
            <div className={s.PassportInfoRow}>
              <div>
                <p className={s.PassportInfoLabel}>Имя</p>
                <p className={s.PassportInfoDescr}>{firstname}</p>
              </div>
              <div>
                <p className={s.PassportInfoLabel}>Фамилия</p>
                <p className={s.PassportInfoDescr}>{lastname}</p>
              </div>
            </div>
            <div className={s.PassportInfoRow}>
              <div>
                <p className={s.PassportInfoLabel}>Возраст</p>
                <p className={s.PassportInfoDescr}>{age}</p>
              </div>
              <div>
                <p className={s.PassportInfoLabel}>Пол</p>
                <p className={s.PassportInfoDescr}>{sex == 1 ? 'Ж' : 'М'}</p>
              </div>
            </div>
            <div className={s.PassportInfoRow}>
              <div>
                <p className={s.PassportInfoLabel}>Лицензии</p>
              </div>
              <div>
                {drivingLicensesString.length > 0 && (
                  <p className={s.PassportInfoDescr}> DL({drivingLicensesString})</p>
                )}
                {weaponLicensesString.length > 0 && (
                  <p className={s.PassportInfoDescr}> FA({weaponLicensesString})</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { IDCard };
