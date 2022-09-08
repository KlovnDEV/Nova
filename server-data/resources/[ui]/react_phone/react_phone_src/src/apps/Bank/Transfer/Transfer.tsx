// core
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// components
import styles from '../index.local.scss';
import transfer from './Transfer.local.scss';
import { Box, TextField, ListItem, TextArea } from 'libs/UI';
import { Page, BottomBar, Avatar } from 'views/components';
// ui
// storage
import ContactStore from 'storage/ContactStore';
// styles

interface IParams {
  phoneNumber?: string;
  contactId?: string;
}

function Transfer(): JSX.Element {
  const { phoneNumber, contactId } = useParams<IParams>();
  const [phoneNumberText, setPhoneNumberText] = useState('');

  const contact = ContactStore.contacts.find(c => parseInt(contactId, 10) === c.id);

  return (
    <>
      <Page
        className={styles.screen}
        backgroundBlur
        statusBar="dark"
        bottomBar={<BottomBar variant="dark" />}
      >
        <Box flex="column center">
          <p className={$(transfer.header)}>Перевод средств</p>
        </Box>
        <Box flex="column center">
          <div className={transfer.transferTo}>
            {!contactId && (
              <TextField
                fullWidth
                variant="outlined"
                label="Введите номер"
                onChange={e => {
                  setPhoneNumberText(e.target.value);
                }}
                value={phoneNumberText}
              />
            )}
            {contactId && (
              <ListItem
                left={<Avatar className="contact__avatar" contact={contact} />}
                header={<div className="contact__name">{contact.name}</div>}
              >
                <div className="contact__description">{contact.phone}</div>
              </ListItem>
            )}
            <TextField
              fullWidth
              variant="outlined"
              label="Введите номер"
              onChange={e => {
                setPhoneNumberText(e.target.value);
              }}
              value={phoneNumberText}
            />
          </div>
        </Box>
        <Box>
          <TextArea />
        </Box>
      </Page>
    </>
  );
}

export default Transfer;
