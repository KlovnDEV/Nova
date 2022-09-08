/* eslint-disable react-hooks/rules-of-hooks */
// core
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import classNames from 'classnames';
// UI
import { SvgIcon, FloatingButton, Button, Box } from 'libs/UI';
// components
import { Page, Avatar, Timer } from 'views/components';
// utils
import API from 'API';
import { Ringtone } from 'utils/Ringtone';
import { useEventHandler } from 'utils/Utils';
// storage
import ContactStore from 'storage/ContactStore';
// styles
import './CallScreen.scss';

const audio = new Audio('assets/audio/dialtone.mp3');
audio.volume = 0.3;
audio.loop = true;

function stopDial() {
  audio.pause();
  audio.currentTime = 0;
  Ringtone.stop();
}

interface IParams {
  phoneNumber: string;
  callState: string;
}
// FIXME: проставить типы
export function CallScreen({ routeMatch }: { routeMatch: string }): JSX.Element {
  const history = useHistory();
  const { phoneNumber, callState } = useParams<IParams>();

  function endCall() {
    API.query('phone/call/end', {});
    Ringtone.stop();
  }

  if (!routeMatch) {
    stopDial();
    return null;
  }

  if (callState === 'out') {
    audio.src = 'assets/audio/dialtone.mp3';
    audio.play();
  } else if (callState === 'busy') {
    audio.src = 'assets/audio/busytone.ogg';
    audio.play();
  } else if (callState === 'na') {
    audio.src = 'assets/audio/disconnected.mp3';
    audio.play();
  } else if (callState === 'in') {
    Ringtone.play();
  } else {
    stopDial();
  }

  let contact = ContactStore.contacts.find(c => c.phone === phoneNumber);

  if (!contact) {
    contact = {
      id: -1,
      name: 'Неизвестно',
      phone: phoneNumber,
    };
  }

  useEventHandler(data => {
    if (data.callAccepted && data.to_phone === phoneNumber) {
      history.replace(`/call/${phoneNumber}`);
    }
    if (data.callEnded && (data.to_phone === phoneNumber || data.from_phone === phoneNumber)) {
      history.replace('/');
    }
  });

  useEffect(() => {
    if (callState === 'out') {
      API.query('phone/call/start', { phone: phoneNumber }).then(response => {
        const res = response.data;
        if (routeMatch) {
          if (res === 'busy') {
            history.replace(`/call/${phoneNumber}/busy`);
          } else if (res === 'na') {
            history.replace(`/call/${phoneNumber}/na`);
          }
        }
      });

      return () => {
        stopDial();
        endCall();
      };
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttons = [
    {
      description: 'Выкл. микрофон',
      icon: 'MicOff',
      onClick: () => {
        console.log('mute');
      },
    },
    {
      description: 'Клавиатура',
      icon: 'dial',
      onClick: () => {
        console.log('keyboard');
      },
    },
    {
      description: 'Динамик',
      icon: 'VolumeUp',
      onClick: () => {
        console.log('volume');
      },
    },
    {
      description: 'Добавить вызов',
      icon: 'AddIcCall',
      onClick: () => {
        console.log('add');
      },
    },
    {
      description: 'Удерживать',
      icon: 'Pause',
      onClick: () => {
        console.log('pause');
      },
    },
  ];

  const callStateLabel = () => {
    if (callState === 'in') {
      return 'Входящий вызов';
    }
    if (callState === 'out' || callState === 'na') {
      return 'Вызов ...';
    }
    if (callState === 'busy') {
      return 'Занято';
    }

    return '';
  };

  const onAcceptClick = () => {
    API.query('phone/call/accept', { phone: phoneNumber }).then(() => {
      history.replace(`/call/${phoneNumber}`);
    });
  };

  return (
    <Page
      className={classNames(
        'call-screen__page',
        'page__scrollbar',
        callState ? `state-${callState}` : null,
      )}
      backgroundBlur
      statusBar="dark"
    >
      <div className="call-screen__upper">
        <Box flex="center">
          <Avatar className="call-screen__photo" contact={contact} />
        </Box>
        <Box>
          <div className="call-screen__state-text">{callStateLabel()}</div>
          <div className="call-screen__name">{contact.name}</div>
          <div className="call-screen__phone">{contact.phone}</div>
          <div className="call-screen__calltime">
            {!callState && <Timer startDate={new Date()} />}
          </div>
        </Box>
      </div>

      <div className="call-screen__center">
        <Box className="call-screen__buttons">
          {buttons.map(button => (
            <Button
              key={button.description}
              role="presentation"
              width={80}
              height={60}
              description={button.description}
              onClick={button.onClick}
            >
              <SvgIcon height="32px" fill="#555" src={button.icon} />
            </Button>
          ))}
        </Box>
      </div>

      {callState === 'in' && (
        <Box flex="around" className="call-screen__lower">
          <FloatingButton color="#30a018" onClick={onAcceptClick}>
            <SvgIcon width="70%" fill="#fff" src="close_dial" />
          </FloatingButton>
          <FloatingButton
            color="rgb(220, 0, 58)"
            onClick={() => {
              endCall();
              history.replace('/');
            }}
          >
            <SvgIcon width="70%" fill="#fff" src="close_dial" />
          </FloatingButton>
        </Box>
      )}

      {callState !== 'in' && (
        <Box className="call-screen__lower">
          <FloatingButton
            color="rgb(220, 0, 58)"
            onClick={() => {
              endCall();
              history.replace('/');
            }}
          >
            <SvgIcon width="70%" fill="#fff" src="close_dial" />
          </FloatingButton>
        </Box>
      )}
    </Page>
  );
}

export default CallScreen;
