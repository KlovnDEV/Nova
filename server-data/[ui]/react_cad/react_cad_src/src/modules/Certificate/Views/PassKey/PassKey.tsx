/* eslint-disable import/prefer-default-export */
import React from 'react';
import { zeroPad } from 'utils';
import s from './PassKey.module.scss';

interface IProps {
  firstname: string;
  lastname: string;
  organization: string;
  grade: number;
  id: number;
}

const PassKey = (props: IProps): JSX.Element => {
  const { firstname, lastname, organization, grade, id } = props;

  const orgAbbr = (() => {
    switch (organization) {
      case 'police':
        return 'VHPD';

      case 'ambulance':
        return 'MZMC';

      case 'government':
        return 'LS Gov';

      default:
        return ' ';
    }
  })();

  const paddedId = id < 0 ? 'XXXXX' : zeroPad(id, 5);

  return (
    <div className={$(s.Passport, s[`Variation-${grade}`])} style={{ fontSize: 20 }}>
      <div
        className={s.PassportNoise}
        style={{ background: `url(${ASSETS}/img/certs/noise.png)` }}
      />
      <img
        className={s.PassportBackground}
        src={`${ASSETS}/img/certs/passkey-${organization}.png`}
        alt=""
      />
      <div className={s.PassportWrapper}>
        <h2 className={s.Header}>{orgAbbr}</h2>
        <img className={s.QR} src={`${ASSETS}/img/certs/chip.png`} alt="" />
        <div className={s.PassportInner}>
          <div className={s.PassportInfo}>
            <p className={s.PassportInfoDescr}>
              {firstname} {lastname}
            </p>
            <div className={s.PassportInfoNumberWrapper}>
              <p className={s.PassportInfoNumber}>{paddedId}</p>
              <p className={s.PassportInfoDescr}>{grade}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PassKey };
