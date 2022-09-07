// core
import React, { useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// ui
import { Box, SvgIcon, TextField, AppBar, Dialog, Button } from 'libs/UI';
// components
import { Page, BottomBar, Avatar } from 'views/components';
// utils
import API from 'API';
import PhoneConfig from '~s/storage/PhoneConfig';
import ContactStore from 'storage/ContactStore';
// styles
import './ContactEdit.scss';

interface IParams {
  contactId?: string;
}

export function ContactEdit(): JSX.Element {
  const history = useHistory();
  const params = useParams<IParams>();
  const { contactId } = params;

  let contact = null;
  if (contactId) contact = ContactStore.contacts.find(e => e.id == +contactId);

  if (!contact) {
    contact = {
      name: '',
      phone: '',
      avatar: '',
    };
  }

  const [isAddAvatarOpen, setAddAvatarOpen] = useState(false);
  const addAvatarInputRef = useRef<HTMLInputElement>();
  const [avatar, setAvatar] = useState(contact.avatar);
  const [avatarText, setAvatarText] = useState(contact.avatar);
  const [nameText, setNameText] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const handleAvatarAdd = () => {
    setAddAvatarOpen(true);
    if (addAvatarInputRef.current) {
      addAvatarInputRef.current.focus();
    }
  };

  const clearContactHistory = () => {
    history.replace('/'); // replace current edit mode to index
    history.goBack(); // go to conact page
    history.replace('/contacts/contacts'); // replace to contacts list
  };

  const handleContactEditApply = () => {
    if (contactId === undefined) {
      API.query('phone/contacts/create', {
        sim_number: PhoneConfig.phoneNumber,
        name: nameText,
        avatar,
        phone,
        favorite: false,
      }).then(() => {
        ContactStore.updateContacts();
        clearContactHistory();
      });
    } else {
      API.query('phone/contacts/update', {
        id: contactId,
        name: nameText,
        avatar,
        phone,
      }).then(() => {
        ContactStore.updateContacts();
        clearContactHistory();
      });
    }
  };

  const handleDeleteContact = () => {
    if (contactId !== undefined) {
      API.query('phone/contacts/delete', { id: contactId }).then(() => {
        ContactStore.updateContacts();
        clearContactHistory();
      });
    }
  };

  return (
    <>
      <Dialog
        title="Изменить фото"
        isOpen={isAddAvatarOpen}
        onApply={() => {
          setAddAvatarOpen(false);
          setAvatar(avatarText.trim());
        }}
        onCancel={() => {
          setAddAvatarOpen(false);
        }}
      >
        <p>Вставьте ссылку на изображение</p>
        <TextField
          style={{
            color: '#fff',
          }}
          fullWidth
          variant="flat"
          value={avatarText}
          inputRef={addAvatarInputRef}
          label="Имя и фамилия"
          onChange={e => setAvatarText(e.target.value)}
        />
      </Dialog>
      <Page
        className="contact-edit__page page__scrollbar"
        backgroundBlur
        statusBar="dark"
        bottomBar={<BottomBar variant="light" />}
        appBar={
          <AppBar
            left={
              <button
                onClick={() => {
                  history.goBack();
                }}
                type="button"
              >
                <SvgIcon width={32} height={32} src="CancelOutlined" />
              </button>
            }
            right={
              <button onClick={handleContactEditApply} type="button">
                <SvgIcon width={32} height={32} src="CheckOutlined" />
              </button>
            }
          />
        }
      >
        <div className="contact-edit__upper">
          <Box flex="center" className="contact-edit__photo">
            <button onClick={handleAvatarAdd} type="button" className="contact-edit__add">
              <Avatar style={{ width: 140, height: 140 }} contact={{ avatar: avatar, name: ' ' }} />
              {!avatar && (
                <SvgIcon
                  className="contact-edit__add-icon"
                  width="64"
                  fill="#239cff"
                  src="AddCircle"
                />
              )}
            </button>
          </Box>
        </div>

        <div className="contact-edit__lower">
          <Box className="contact-edit__info">
            <TextField
              fullWidth
              variant="outlined"
              label="Имя и фамилия"
              onChange={e => setNameText(e.target.value)}
              value={nameText}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Номер телефона"
              onChange={e => setPhone(e.target.value)}
              mask="999-99-99"
              value={phone}
            />
          </Box>
        </div>
        {contactId && (
          <Button className="contact-edit__delete" onClick={handleDeleteContact}>
            Удалить контакт
          </Button>
        )}
      </Page>
    </>
  );
}

export default ContactEdit;
