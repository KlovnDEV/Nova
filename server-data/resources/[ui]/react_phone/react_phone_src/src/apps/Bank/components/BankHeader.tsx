// core
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
// styles
import styles from './BankHeader.local.scss';

interface IProps {
  user?: string;
}

function BankHeader({ user }: IProps): JSX.Element {
  const formattedDate = format(new Date(), 'EEEE, d MMM', {
    locale: ru,
    weekStartsOn: 1,
  });

  return (
    <div className={styles.header__wrapper}>
      <h1 className={styles.header}>
        Hi,&nbsp;
        {user}
      </h1>
      <p className={styles.header__time}>{formattedDate}</p>
    </div>
  );
}

export default BankHeader;
