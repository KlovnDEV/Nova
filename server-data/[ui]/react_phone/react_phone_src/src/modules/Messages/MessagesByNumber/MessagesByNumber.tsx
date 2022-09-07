// core
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// ui
import { AppBar, TextArea, SvgIcon, Button, Drawer } from 'libs/UI';
// components
import { ShortMessage } from 'modules/Messages/ShortMessage';
import { Page, BottomBar } from 'views/components';
// utils
import API from 'API';
import { useFocusMap } from 'utils/FocusMap';
// storage
import ContactStore from 'storage/ContactStore';
import PhoneConfig from 'storage/PhoneConfig';
// styles
import './MessagesByNumber.scss';

interface IParams {
  phoneNumber: string;
  messageId?: string;
}

export function MessagesByNumber(): JSX.Element {
  const history = useHistory();
  const [messages, setMessages] = useState([]);
  const [isEmojiDrawerExpanded, setEmojiDrawerExpanded] = useState(false);
  const [isExtraDrawerExpanded, setExtraDrawerExpanded] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');
  const { phoneNumber, messageId } = useParams<IParams>();
  const [focusState] = useFocusMap('messages-textarea');
  const pageRef = useRef<HTMLDivElement>();
  const currentMessageRef = useRef<HTMLDivElement>();
  const textareaRef = useRef<HTMLTextAreaElement>();

  const fetchMessages = () => {
    API.query('phone/messages/get', {
      number1: phoneNumber,
      number2: PhoneConfig.phoneNumber,
    }).then(response => {
      setMessages(response.data);

      if (pageRef.current) {
        if (currentMessageRef.current) {
          pageRef.current.scrollTop = currentMessageRef.current.offsetTop;
        } else {
          pageRef.current.scrollTop = pageRef.current.scrollHeight;
          textareaRef.current.focus();
        }
      }
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Ищем номера в контактах
  if (messages) {
    messages.forEach(message => {
      const foundContact = ContactStore.contacts.find(c => c.phone === message.phone);
      if (foundContact) {
        Object.assign(message, foundContact);
      }
    });
  }

  const handleMessageSend = () => {
    if (newMessageText.length == 0) return;

    API.query('phone/messages/create', {
      sim_number: phoneNumber,
      from_number: PhoneConfig.phoneNumber,
      message: newMessageText,
    }).then(() => {
      fetchMessages();
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

  return (
    <Page
      pageRef={pageRef}
      className="messages-by-number__page page__scrollbar"
      backgroundBlur
      pageLayoutRef={focusState.ref}
      onKeyDown={e => focusState?.onKeyDown(e)}
      statusBar="dark"
      appBar={
        <AppBar
          onBack={() => {
            history.goBack();
          }}
          left={<div>{phoneNumber}</div>}
          right={
            <>
              <button
                type="button"
                // FIXME
                // onClick={() =>
                //   API.deleteMessages(phoneNumber, () => {
                //     history.goBack();
                //   })
                // }
                style={{
                  marginRight: '8px',
                }}
              >
                <SvgIcon width="32px" fill="#555" src="trashcan" />
              </button>
              <button type="button" onClick={() => history.push(`/call/${phoneNumber}/out`)}>
                <SvgIcon width="32px" fill="#555" src="phone" />
              </button>
            </>
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
      <div className="messages-by-number__list">
        {messages &&
          messages
            .sort((a, b) => {
              return a.date - b.date;
            })
            .map(msg => {
              return (
                <ShortMessage
                  messageRef={msg.id == messageId ? currentMessageRef : null}
                  key={msg.id}
                  contact={msg}
                  text={msg.text}
                  date={msg.date}
                  incoming={msg.from_number == phoneNumber}
                />
              );
            })}
      </div>
    </Page>
  );
}

export default MessagesByNumber;
