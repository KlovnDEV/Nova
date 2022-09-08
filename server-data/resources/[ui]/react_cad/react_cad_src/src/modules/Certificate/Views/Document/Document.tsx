import React from 'react';

import s from './Document.module.scss';

interface IProps {
  firstname: string;
  lastname: string;
  organization: string;
  author: string;
  title: string;
  text: string;
  date: Date;
}

const Document = (props: IProps): JSX.Element => {
  const { title, author, firstname, lastname, organization, text, date } = props;

  const orgAbbr = (() => {
    switch (organization) {
      case 'police':
        return 'Vinewood Hills Police Department';

      case 'ambulance':
        return 'Mount Zonah Medical Center';

      case 'government':
        return 'Los Santos Government';

      default:
        return ' ';
    }
  })();

  const sign = author.split(' ').pop();

  return (
    <div className={s.Body}>
      <div className={s.Banner}>
        <div className={s.BannerInner}>
          <img className={s.Logo} src={`${ASSETS}/img/logo/${organization}.png`} alt="" />
          <div className={s.BannerDetails}>
            <p className={s.From}>{orgAbbr}</p>
            <p className={s.To}>{`${firstname} ${lastname}`}</p>
          </div>
        </div>
        <img className={s.BannerBg} src={`${ASSETS}/img/logo/${organization}-banner.png`} alt="" />
      </div>
      <div className={s.Inner}>
        <h2 className={s.Header}>{title}</h2>
        <p className={s.Paragraph}>{text}</p>
      </div>
      <div className={s.Footer}>
        <div className={s.FooterRow}>
          <p className={s.FooterLabel}>Дата</p>
          <p className={s.FooterDescr}>{date.toLocaleDateString()}</p>
        </div>
        <div className={s.FooterRow}>
          <p className={s.FooterLabel}>{author}</p>
          <p className={s.Signature}>{sign}</p>
        </div>
      </div>
    </div>
  );
};

export { Document };
export default Document;
