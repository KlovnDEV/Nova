import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';
// components
import { Button, InputField } from 'libs/UI';
// style
import API from 'API';
import s from './index.local.scss';
// store
import Storage from './Storage';

const btns = [
  {
    name: 'ME',
    value: '/me',
  },
  {
    name: 'OOC',
    value: '/ooc',
  },
  {
    name: 'Report',
    value: '/report',
  },
];

const argColor = {
  player: '#f68f9b',
  string: '#5ecfbd',
  number: '#ece78e',
};

const ChatProto = (): JSX.Element => {
  const messagesRef = useRef<HTMLDivElement>();
  Storage.textareaRef = useRef<HTMLTextAreaElement>();

  const suggestons = Storage.findCommand(Storage.command);
  if (suggestons.length > 10) suggestons.length = 10;

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  });

  useEffect(() => {
    Storage.updateWindowTimer();
  }, []);

  const onWrapperKeyDown = e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      let newBtnIndex = btns.findIndex(btn => btn.value === Storage.activeChat) + 1;
      if (newBtnIndex >= btns.length) newBtnIndex = 0;
      Storage.activeChat = btns[newBtnIndex].value;
    }
  };

  const onInputKeyDown = e => {
    if (e.key === 'PageUp') {
      e.preventDefault();
      if (messagesRef.current) messagesRef.current.scrollBy(0, -100);
    }

    if (e.key === 'PageDown') {
      e.preventDefault();
      if (messagesRef.current) messagesRef.current.scrollBy(0, 100);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      Storage.getMessageHistory(1);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      Storage.getMessageHistory(-1);
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const message = e.target.value;

      const btn = btns.find(b => b.value === Storage.activeChat);

      API.query('chat/result', {
        message: message[0] === '/' ? message : `${btn.value} ${message}`,
        canceled: message.length === 0,
      }).then(() => {
        Storage.command = '';
        Storage.history.unshift(message);
        Storage.historyIndex = undefined;
        // eslint-disable-next-line no-param-reassign
        e.target.value = '';
        e.target.blur();
      });

      return;
    }

    Storage.updateWindowTimer();
  };

  let chatOpacity;

  switch (Storage.chatShown) {
    case 'input':
      chatOpacity = 1;
      break;
    case 'view':
      chatOpacity = 0.75;
      break;
    default:
      chatOpacity = 0;
  }

  const inputOpacity = { opacity: Storage.chatShown === 'input' ? 1 : 0 };

  const paramsMap = (
    params: { name: string; help: string; type: 'string' | 'number' | 'player' | 'any' }[],
  ) => {
    return params.map((arg, index) => {
      return (
        <span
          className={index === Storage.currentArg ? classNames(s.ActiveArg, s.ActiveItem) : null}
          style={{
            color: argColor[arg.type],
          }}
          key={arg.name}
        >
          &nbsp;[{arg.name}]
        </span>
      );
    });
  };

  return (
    <div
      role="presentation"
      className={s.ChatWrapper}
      onKeyDown={onWrapperKeyDown}
      tabIndex={-1}
      style={{ opacity: chatOpacity }}
    >
      <div className={s.Messages} ref={messagesRef}>
        <div className={s.MessagesScrollPane}>
          {Storage.messages.map(message => (
            <p
              className={s.Message}
              style={{ color: message.color ? `rgb(${message.color.join(',')})` : undefined }}
            >
              {message.args.map(arg => (
                <span>{arg}&nbsp;</span>
              ))}
            </p>
          ))}
        </div>
      </div>
      <div className={s.Buttons} style={inputOpacity}>
        {btns.map(item => (
          <Button
            key={item.name}
            className={s.Button}
            variant="rect"
            active={Storage.activeChat === item.value}
            onClick={() => {
              Storage.activeChat = item.value;
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className={s.Chat} style={inputOpacity}>
        <InputField
          name="name"
          multiline
          textareaRef={Storage.textareaRef}
          onKeyDown={onInputKeyDown}
          onChange={e => {
            Storage.command = e.target.value;
          }}
        />
      </div>
      {suggestons.length > 0 && (
        <div className={s.Suggestions} style={inputOpacity}>
          {suggestons.map(cmd => (
            <>
              <p key={cmd.name}>
                <span>{cmd.name}</span>
                {paramsMap(cmd.params)}
              </p>
              {Storage.currentArg >= 0 && Storage.currentArg < cmd.params.length ? (
                <p className={s.ActiveItem}>{cmd.params[Storage.currentArg].help}</p>
              ) : (
                <p className={s.ActiveItem}>{cmd.help}</p>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

const Chat = observer(ChatProto);

export { Chat };
export default Chat;
