import React from 'react';

import s from './Fine.module.scss';

interface IProps {
  firstname: string;
  lastname: string;
  author: string;
  fineAmount: number;
  date: Date;
  lawId: number;
  text: string;
}

const Fine = (props: IProps): JSX.Element => {
  const { fineAmount, lawId, author, firstname, lastname, date, text } = props;

  const sign = author.split(' ').pop();

  return (
    <div className={s.Body}>
      <div className={s.Banner}>
        <div className={s.BannerInner}>
          <img className={s.Logo} src={`${ASSETS}/img/certs/passkey-police.png`} alt="" />
          <div className={s.BannerDetails}>
            <p className={s.From}>Vinewood Hills Police Department</p>
            <p className={s.To}>{`${firstname} ${lastname}`}</p>
          </div>
        </div>
        {/* <img className={s.BannerBg} src={`${ASSETS}/img/certs/lspdbanner.png`} /> */}
      </div>
      <div className={s.Inner}>
        <h2 className={s.Header}>Уведомление о Штрафе</h2>
        <div className={s.Row}>
          <p className={s.FooterLabel}>Дата</p>
          <p className={s.FooterDescr}>{date.toLocaleDateString()}</p>
        </div>
        <div className={s.Row}>
          <p className={s.FooterLabel}>Сумма штрафа</p>
          <p className={s.FooterDescr}>{fineAmount}</p>
        </div>
        <div className={$(s.Row, s.RowFluid)}>
          <p className={s.FooterLabel}>Нарушение (статья)</p>
          <p className={s.FooterDescr}>{lawId}</p>
        </div>
        <div className={$(s.Row, s.RowFluid)}>
          <p className={s.FooterLabel}>Дополнительная информация</p>
          <p className={s.FooterDescr}>{text}</p>
        </div>
      </div>
      <div className={s.Footer}>
        <div className={s.FooterRow}>
          <p className={s.FooterLabel}>{author}</p>
          <p className={s.Signature}>{sign}</p>
        </div>
      </div>
    </div>
  );
};

export { Fine };
export default Fine;
