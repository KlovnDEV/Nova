// core
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
// ui
import { TextField, FloatingButton, SvgIcon } from 'libs/UI';
// components
import { Page, BottomBar } from 'views/components';
import { ContactItem } from 'views/components/ContactItem';
// utils
import API from 'API';
import PhoneConfig from '~s/storage/PhoneConfig';
import { useFocusMap } from 'utils/FocusMap';
// storage
import ContactStore from 'storage/ContactStore';
// styles
import './Messages.scss';

export function Messages(): JSX.Element {
  const history = useHistory();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [filterText, setFilterText] = useState('');
  const [focusState] = useFocusMap('contact0');

  const handleFilterChange = e => {
    setFilterText(e.target.value);
  };

  useEffect(() => {
    API.query('phone/messages/getlast', { phoneNumber: PhoneConfig.phoneNumber }).then(response => {
      setMessages(response.data);
    });
  }, []);

  const messageMap = {} as Record<string, IMessage>;

  let filteredMessages = messages;

  if (filterText !== '') {
    const text = filterText.toLowerCase();
    filteredMessages = messages.filter(elem => {
      if (elem.contact?.name?.toLowerCase().includes(text)) return true;
      if (elem.from_number.includes(text)) return true;
      if (elem.sim_number.includes(text)) return true;
      return false;
    });
  }

  // Ищем номера в контактах
  filteredMessages.forEach(message => {
    if (message.from_number === PhoneConfig.phoneNumber) {
      // eslint-disable-next-line no-param-reassign
      message.phone = message.sim_number;
    } else {
      // eslint-disable-next-line no-param-reassign
      message.phone = message.from_number;
    }
    const foundContact = ContactStore.contacts.find(c => c.phone === message.phone);
    if (foundContact) {
      // eslint-disable-next-line no-param-reassign
      message.contact = foundContact;
    }

    if (!messageMap[message.phone]) {
      messageMap[message.phone] = message;
    } else if (messageMap[message.phone].date < message.date) messageMap[message.phone] = message;
  });

  return (
    <Page
      className="messages__page page__scrollbar"
      backgroundBlur
      statusBar="dark"
      bottomBar={<BottomBar variant="dark" />}
      pageLayoutRef={focusState.ref}
      onKeyDown={e => focusState?.onKeyDown(e)}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Поиск контактов"
        onChange={handleFilterChange}
        value={filterText}
        focus={{ name: 'contact-search', down: 'contact0' }}
      />
      <FloatingButton
        onClick={() => {
          history.push(`/newMessage`);
        }}
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          transition: 'transform 250ms ease-in-out',
        }}
      >
        <SvgIcon width="70%" fill="#fff" src="MessageOutlined" />
      </FloatingButton>
      <div className="messages__list">
        {Object.values(messageMap)
          .sort((a, b) => {
            return b.date - a.date;
          })
          .map((message, index) => {
            const messageDate = new Date(message.date);

            const formattedDate = format(messageDate, 'd LLL', { locale: ru, weekStartsOn: 1 });

            return (
              <ContactItem
                onClick={() => {
                  history.push(`/messages/${message.phone}`);
                }}
                key={message.phone}
                name={message.contact?.name || message.phone}
                description={message.text}
                letter={null}
                contact={message.contact}
                right={<p className="messages__rightdate">{formattedDate}</p>}
                tabIndex={index}
                focus={{
                  name: `contact${index}`,
                  left: 'contact0',
                  down: `contact${index + 1}`,
                  up: (() => {
                    if (index === 0) return 'contact-search';
                    return `contact${index - 1}`;
                  })(),
                }}
              />
            );
          })}
      </div>
    </Page>
  );
}

export default Messages;
