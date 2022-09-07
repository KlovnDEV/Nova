// core
import React from 'react';
// components
import BankHeader from './components/BankHeader';
import styles from './index.local.scss';
import { Page, BottomBar } from 'views/components';
// styles

function Invest(): JSX.Element {
  return (
    <Page
      className={styles.screen}
      backgroundBlur
      statusBar="dark"
      bottomBar={<BottomBar variant="dark" />}
    >
      <BankHeader user="user" />
    </Page>
  );
}

export default Invest;
