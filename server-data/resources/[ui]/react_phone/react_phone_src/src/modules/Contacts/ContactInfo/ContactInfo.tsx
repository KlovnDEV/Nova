// core
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
// ui
import { AppBar, Box, Button, SvgIcon } from 'libs/UI';
// components
import { Page, BottomBar, Avatar } from 'views/components';
// utils
import API from 'API';
// storage
import ContactStore from 'storage/ContactStore';
// styles
import './ContactInfo.scss';

function Info(): JSX.Element {
  const history = useHistory();
  const { contactId } = useParams<any>();

  const contact = ContactStore.contacts.find(c => parseInt(contactId, 10) === c.id);
  if (!contact) return null;

  return (
    <Page
      className="contact-info__page page__scrollbar"
      backgroundBlur
      appBar={
        <AppBar
          right={
            <>
              <button
                onClick={() => {
                  API.query('phone/contacts/setfavorite', {
                    id: contact.id,
                    favorite: !contact.favorite,
                  }).then(() => {
                    const val = !contact.favorite;
                    ContactStore.setFavorite(contact.id, val);
                  });
                }}
                type="button"
              >
                <SvgIcon
                  className="contact-info__favorite-button"
                  width="32px"
                  fill="#555"
                  src={contact.favorite ? 'Star' : 'StarOutline'}
                />
              </button>
              <button onClick={() => history.push(`/contact/edit/${contactId}`)} type="button">
                <SvgIcon width="32px" fill="#555" src="Edit" />
              </button>
            </>
          }
          onBack={() => {
            history.goBack();
          }}
        />
      }
      statusBar="dark"
      bottomBar={<BottomBar variant="light" />}
    >
      <div className="contact-info__upper">
        <Box flex="center" className="contact-info__photo">
          <Avatar style={{ width: 140, height: 140 }} contact={contact} />
        </Box>
        <div className="contact-info__name">{contact.name}</div>
      </div>

      <div className="contact-info__lower">
        <Box flex="around baseline" className="contact-info__buttons">
          <Button
            width={80}
            height={56}
            description="Позвонить"
            onClick={() => {
              history.push(`/call/${contact.phone}/out`);
            }}
          />
          <Button
            width={80}
            height={56}
            description="История звонков"
            onClick={() => {
              history.push(`/recent/${contact.phone}`);
            }}
          >
            <SvgIcon width="32px" fill="#555" src="HistoryOutlined" />
          </Button>
          <Button
            width={80}
            height={56}
            description="Отправить сообщение"
            onClick={() => {
              history.push(`/messages/${contact.phone}`);
            }}
          >
            <SvgIcon width="32px" fill="#555" src="MessageOutlined" />
          </Button>
          <Button width={80} height={56} description="Отправить координаты">
            <SvgIcon width="32px" fill="#555" src="PersonPinCircle" />
          </Button>
        </Box>
        <Box flex="center" className="contact-info__phone-number">
          <SvgIcon width="32px" fill="#555" src="phone" />
          <p>{contact.phone}</p>
        </Box>
      </div>
    </Page>
  );
}

export const ContactInfo = observer(Info);
export default observer(Info);
