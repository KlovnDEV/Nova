// core
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// ui
import { AppBar, TextArea, SvgIcon, Button, Drawer, TextField } from 'libs/UI';
// components
import { Page, BottomBar } from 'views/components';
// utils
import API from 'API';
import { useFocusMap } from 'utils/FocusMap';
// storage
import PhoneConfig from 'storage/PhoneConfig';
import ContactStore from 'storage/ContactStore';

export function NewMessage(): JSX.Element {
  const history = useHistory();
  const [recieverNumber, setRecieverNumber] = useState<string>();
  const [isEmojiDrawerExpanded, setEmojiDrawerExpanded] = useState(false);
  const [isExtraDrawerExpanded, setExtraDrawerExpanded] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');
  const [focusState] = useFocusMap('messages-textarea');
  const pageRef = useRef<HTMLDivElement>();
  const textareaRef = useRef<HTMLTextAreaElement>();
  const inputNumberRef = useRef<HTMLInputElement>();

  const contacts = [...ContactStore.contacts];

  useEffect(() => {
    inputNumberRef.current.focus();
  }, []);

  const handleMessageSend = () => {
    if (newMessageText.length == 0) return;

    API.query('phone/messages/create', {
      sim_number: recieverNumber,
      from_number: PhoneConfig.phoneNumber,
      message: newMessageText,
    }).then(response => {
      history.replace(`/messages/${recieverNumber}`);
    });

    setNewMessageText('');
  };

  const handleTextAreaKeyPress = e => {
    if (e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handleMessageSend();
      return false;
    }
    return true;
  };

  const handeInputNumberChange = e => {
    const number = e.target.value;

    if (!number.includes(' ') && number.length) {
      setRecieverNumber(number);
      const matchedContact = contacts.find(c => c.phone === number);
      if (matchedContact) return history.replace(`/messages/${number}`);
      textareaRef.current.focus();
      return number;
    }

    setRecieverNumber(number);
    return number;
  };

  const handleKey = e => {
    if (e.keyCode === 189 || e.keyCode === 109) {
      e.preventDefault();
    }

    if (e.keyCode === 8 || e.keyCode === 46) {
      setRecieverNumber('');
    }

    return recieverNumber;
  };

  return (
    <Page
      pageRef={pageRef}
      className="page__scrollbar"
      backgroundBlur
      pageLayoutRef={focusState.ref}
      onKeyDown={e => focusState?.onKeyDown(e)}
      statusBar="dark"
      appBar={
        <AppBar
          onBack={() => {
            history.goBack();
          }}
          left={
            <TextField
              fullWidth
              variant="flat"
              placeholder="Введите номер"
              inputRef={inputNumberRef}
              onChange={e => handeInputNumberChange(e)}
              onKeyDown={e => handleKey(e)}
              value={recieverNumber || ''}
              mask={'999-99-99'}
              maskOptions={{ placeholder: ' ' }}
            />
          }
        />
      }
      bottomBar={
        <>
          <Drawer
            position="bottom"
            style={{ marginBottom: 130, borderRadius: 15 }}
            isExpanded={isEmojiDrawerExpanded}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {PhoneConfig.emojiList.map(emoji => (
                <div
                  role="presentation"
                  style={{ padding: 5, cursor: 'pointer' }}
                  key={emoji}
                  onClick={() => {
                    setNewMessageText(text => text + emoji);
                    setEmojiDrawerExpanded(false);
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </Drawer>
          <Drawer
            position="bottom"
            style={{ width: '60%', marginBottom: 130, borderRadius: 15 }}
            isExpanded={isExtraDrawerExpanded}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              options list here
            </div>
          </Drawer>
          <div className="messages-by-number__toolbar">
            <Button
              round
              width={36}
              height={36}
              elevation={2}
              onClick={() => setExtraDrawerExpanded(prev => !prev)}
            >
              <SvgIcon width={24} height={24} fill="#1976d2" src="Add" />
            </Button>
            <div className="messages-by-number__toolbar-right">
              <TextArea
                className="messages-by-number__toolbar-textarea"
                onKeyPress={handleTextAreaKeyPress}
                onChange={e => setNewMessageText(e.target.value)}
                onClick={() => {
                  setExtraDrawerExpanded(false);
                  setEmojiDrawerExpanded(false);
                }}
                value={newMessageText}
                inputRef={textareaRef}
              />
              <Button onClick={() => setEmojiDrawerExpanded(prev => !prev)}>
                <SvgIcon width={20} height={20} fill="#4381e6" src="Emoji" />
              </Button>
              <Button onClick={handleMessageSend}>
                <SvgIcon width={20} height={20} fill="#4381e6" src="SendOutlined" />
              </Button>
            </div>
          </div>
          <BottomBar variant="dark" />
        </>
      }
    >
      <div className="messages-by-number__list" />
    </Page>
  );
}

export default NewMessage;
