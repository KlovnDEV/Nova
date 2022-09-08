/* eslint-disable @typescript-eslint/no-var-requires */
// core
import React from 'react';
import { useHistory } from 'react-router-dom';
// components
// ui
// store
import BankHeader from './components/BankHeader';
// styles
import styles from './index.local.scss';
// routes
import BankLoader from './Loader';
import Balance from './Balance/Balance';
import Fines from './Fines';
import Invest from './Invest';
import Transfer from './Transfer/Transfer';
import { ListItem, SvgIcon, Box } from 'libs/UI';
import { BottomBar, Page } from 'views/components';
import PhoneConfig from 'storage/PhoneConfig';

function Bank(): JSX.Element {
  const history = useHistory();

  const handleTransactionClick = () => {
    console.log('Transaction click');
  };

  return (
    <Page
      className={$(styles.screen, styles.screen_grid)}
      backgroundBlur
      statusBar="dark"
      bottomBar={<BottomBar variant="dark" />}
    >
      <BankHeader user="user" />
      <div className={styles.card}>
        <img className={styles.logo} src="./img/logo.png" alt="" />
      </div>
      <div className={styles.body}>
        <Box flex="column center">
          <p className={styles.bodyHeader}>Баланс</p>
          <p className={styles.bodyDescr}>
            $<span className={styles.bodyDescrAmount}>12 000 000</span>
          </p>
        </Box>
        <Box flex="center">
          <button
            type="button"
            className={styles.button}
            onClick={() => history.push('/apps/bank/balance')}
          >
            <SvgIcon fill="#fff" width={20} height={20} src="ArrowForwardIos" />
          </button>
        </Box>
        <Box flex="column center">
          <p className={styles.bodyHeader}>Штрафы</p>
          <p className={styles.bodyDescr}>
            $<span className={styles.bodyDescrDmount}>12 000</span>
          </p>
        </Box>
        <Box flex="center">
          <button
            type="button"
            className={styles.button}
            onClick={() => history.push('/apps/bank/fines')}
          >
            <SvgIcon fill="#fff" width={20} height={20} src="ArrowForwardIos" />
          </button>
        </Box>
        <Box flex="column center">
          <p className={styles.bodyHeader}>Инвестиции</p>
          <p className={styles.bodyDescr}>
            $<span className={styles.bodyDescrAmount}>0</span>
          </p>
        </Box>
        <Box flex="center">
          <button
            type="button"
            className={styles.button}
            onClick={() => history.push('/apps/bank/invest')}
          >
            <SvgIcon fill="#fff" width={20} height={20} src="ArrowForwardIos" />
          </button>
        </Box>
      </div>
      <div className={$(styles.transactions, 'page__scrollbar')}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
          <ListItem
            key={e}
            onClick={handleTransactionClick}
            left={
              <img
                className={styles.transactionIcon}
                src={require('./img/icon.png').default}
                alt=""
              />
            }
            right={<div className={styles.transactionValue}>- $ 500</div>}
            header={<div className={styles.transactionHeader}>Заголовок</div>}
          >
            <div className={styles.transactionContent}>Текст</div>
          </ListItem>
        ))}
      </div>
    </Page>
  );
}

(async () => {
  PhoneConfig.registerApplication({
    app: Bank,
    link: '/apps/bank/loader',
    label: 'Банк',
    icon: require('./img/icon.png').default,
    routes: [
      { exact: true, path: '/apps/bank', component: Bank },
      { exact: true, path: '/apps/bank/loader', component: BankLoader },
      { exact: true, path: '/apps/bank/balance', component: Balance },
      { exact: true, path: '/apps/bank/fines', component: Fines },
      { exact: true, path: '/apps/bank/invest', component: Invest },
      { exact: true, path: '/apps/bank/transfer-number/:phoneNumber?', component: Transfer },
      { exact: true, path: '/apps/bank/transfer-contact/:contactId', component: Transfer },
    ],
  });
})();

export default Bank;
