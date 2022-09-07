// core
import React from 'react';
import { useHistory } from 'react-router-dom';
// components
import BankHeader from '../components/BankHeader';
import styles from '../index.local.scss';
import balance from './Balance.local.scss';
import { Box } from 'libs/UI';
import { Page, BottomBar, ContactItem } from 'views/components';
// storage
import ContactStore from 'storage/ContactStore';
// styles

function Balance(): JSX.Element {
  const history = useHistory();

  const contacts = [...ContactStore.contacts];

  contacts.sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (b.favorite && !a.favorite) return 1;
    return a.name > b.name ? 1 : -1;
  });

  return (
    <>
      <Page
        className={$(styles.screen, balance.screen)}
        backgroundBlur
        statusBar="dark"
        bottomBar={<BottomBar variant="dark" />}
      >
        <BankHeader user="user" />
        <Box className={balance.body} flex="column center top">
          <p className={$(styles.bodyHeader, balance.bodyHeader)}>Баланс</p>
          <p className={$(styles.bodyDescr, balance.bodyDescr)}>
            $<span className={$(styles.bodyDescrAmount, balance.bodyDescrAmount)}>12 000 000</span>
          </p>
          <Box flex="column center">
            <p className={$(styles.bodyHeader, balance.bodyHeader)}>Перевод средств</p>
            <button
              type="button"
              className={styles.button}
              onClick={() => history.push('/apps/bank/transfer-number')}
            >
              ввести номер
            </button>
            <p className={$(balance.transferDescr)}>или выберите контакт из списка ниже</p>
          </Box>
        </Box>
        <div className={$(balance.contacts, 'page__scrollbar')}>
          {contacts.map((c, index) => {
            return (
              <ContactItem
                key={c.id}
                name={c.name}
                tabIndex={index}
                focus={{
                  name: `contact${index}`,
                  right: 'button-add',
                  left: 'tab2',
                  down: (() => {
                    if (index === contacts.length - 1) return 'tab2';
                    return `contact${index + 1}`;
                  })(),
                  up: (() => {
                    if (index === 0) return 'contact-search';
                    return `contact${index - 1}`;
                  })(),
                }}
                onClick={() => history.push(`/apps/bank/transfer-contact/${c.id}`)}
                contact={c}
              />
            );
          })}
        </div>
      </Page>
    </>
  );
}

export default Balance;
