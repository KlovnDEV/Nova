// core
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// UI
import { Drawer, FloatingButton, Box, Button, SvgIcon } from 'libs/UI';
// styles
import './ContactsDial.scss';

const audio = new Audio('assets/audio/Dtmf0.ogg');
audio.volume = 0.3;
audio.loop = false;

interface IProps {
  isOpen: boolean;
  onClose: React.ComponentProps<'div'>['onClick'];
}

export function ContactsDial(props: IProps): JSX.Element {
  const { isOpen, onClose } = props;
  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState('');

  const buttonList = [
    {
      label: '1',
      description: '',
      focus: { left: '', right: '2', up: '-erase-button', down: '4' },
      audio: 'Dtmf1',
    },
    {
      label: '2',
      description: 'abc',
      focus: { left: '1', right: '3', up: '-erase-button', down: '5' },
      audio: 'Dtmf2',
    },
    {
      label: '3',
      description: 'def',
      focus: { left: '2', right: '', up: '-erase-button', down: '6' },
      audio: 'Dtmf3',
    },
    {
      label: '4',
      description: 'ghi',
      focus: { left: '', right: '5', up: '1', down: '7' },
      audio: 'Dtmf4',
    },
    {
      label: '5',
      description: 'jkl',
      focus: { left: '4', right: '6', up: '2', down: '8' },
      audio: 'Dtmf5',
    },
    {
      label: '6',
      description: 'mno',
      focus: { left: '5', right: '', up: '3', down: '9' },
      audio: 'Dtmf6',
    },
    {
      label: '7',
      description: 'pqrs',
      focus: { left: '', right: '8', up: '4', down: '*' },
      audio: 'Dtmf7',
    },
    {
      label: '8',
      description: 'tuv',
      focus: { left: '7', right: '9', up: '5', down: '0' },
      audio: 'Dtmf8',
    },
    {
      label: '9',
      description: 'wxyz',
      focus: { left: '8', right: '', up: '6', down: '#' },
      audio: 'Dtmf9',
    },
    {
      label: '*',
      description: '',
      focus: { left: '', right: '0', up: '7', down: '' },
      audio: 'DtmfStar',
    },
    {
      label: '0',
      description: '+',
      focus: { left: '*', right: '#', up: '8', down: '-call-button' },
      audio: 'Dtmf0',
    },
    {
      label: '#',
      description: '',
      focus: { left: '0', right: '', up: '9', down: '-hide-button' },
      audio: 'DtmfHash',
    },
  ];

  return (
    <Drawer position="bottom" isExpanded={isOpen} elevation={16}>
      <div className="dial__phoneNumber">
        {phoneNumber}
        <Button
          className="dial__button dial__backspace"
          onClick={() => {
            setPhoneNumber(number => number.slice(0, -1));
          }}
          tabIndex={3}
          focus={{ name: 'dial-erase-button', down: 'dial3' }}
        >
          <SvgIcon fill="#aaa" src="backspace" width={24} height={24} />
        </Button>
      </div>
      <div className="dial__grid">
        {buttonList.map((elem, index) => {
          return (
            <Button
              className="dial__button"
              key={elem.label}
              tabIndex={index}
              focus={{
                name: `dial${elem.label}`,
                down: `dial${elem.focus.down}`,
                up: `dial${elem.focus.up}`,
                left: `dial${elem.focus.left}`,
                right: `dial${elem.focus.right}`,
              }}
              onMouseUp={() => {
                audio.pause();
                audio.currentTime = 0;
              }}
              onClick={() => {
                audio.src = `assets/audio/${elem.audio}.ogg`;
                audio.loop = true;
                audio.play();
                setTimeout(() => {
                  audio.pause();
                  audio.currentTime = 0;
                }, 100);

                setPhoneNumber(number => {
                  let res = number;
                  if (res.length >= 9) return res;
                  if (res.length === 3 || res.length === 6) res += '-';
                  return res + elem.label;
                });
              }}
            >
              {elem.label}
              <div className="dial__button-description">{elem.description}</div>
            </Button>
          );
        })}
        <div />
        <Box flex="center">
          <FloatingButton
            color="#30a018"
            onClick={() => {
              if (phoneNumber) history.push(`/call/${phoneNumber}/out`);
            }}
            tabIndex={1}
            focus={{ name: 'dial-call-button', up: 'dial0', right: 'dial-hide-button' }}
          >
            <SvgIcon width={26} height={26} fill="#fff" src="phone" />
          </FloatingButton>
        </Box>
        <Box flex="center">
          <Button
            onClick={onClose}
            className="dial__button"
            tabIndex={2}
            focus={{ name: 'dial-hide-button', up: 'dial#', left: 'dial-call-button' }}
          >
            <SvgIcon width={24} height={32} fill="#aaa" src="dial" />
            <div className="dial__button-description">Hide</div>
          </Button>
        </Box>
      </div>
    </Drawer>
  );
}

export default ContactsDial;
