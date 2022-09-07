import React from 'react';
import { observe } from 'mobx';
// storage
import PhoneConfig from 'storage/PhoneConfig';

class RingtoneProto {
  audio: AnyObject;

  constructor() {
    this.audio = new Audio(PhoneConfig.ringtone);
    this.audio.volume = PhoneConfig.ringtoneVolume;

    observe(PhoneConfig, 'ringtoneVolume', change => {
      this.audio.volume = change.newValue;
    });

    observe(PhoneConfig, 'ringtone', change => {
      this.audio.src = change.newValue;
    });
  }

  get src() {
    return PhoneConfig.ringtone;
  }

  set src(val) {
    PhoneConfig.ringtone = val;
  }

  get volume() {
    return PhoneConfig.ringtoneVolume;
  }

  set volume(val) {
    PhoneConfig.ringtoneVolume = val;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  stop() {
    this.pause();
    this.audio.currentTime = 0;
  }
}

export const Ringtone = new RingtoneProto();

export const TestMarkup = (): JSX.Element => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 50,
        left: 50,
        padding: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        backgroundColor: 'rgba(0,0,0, 0.3)',
      }}
    >
      <button
        type="button"
        onClick={() => {
          Ringtone.play();
        }}
      >
        PLAY
      </button>

      <button
        type="button"
        onClick={() => {
          Ringtone.pause();
        }}
      >
        PAUSE
      </button>

      <button
        type="button"
        onClick={() => {
          Ringtone.stop();
        }}
      >
        STOP
      </button>

      <button
        type="button"
        onClick={() => {
          Ringtone.volume += 0.1;
        }}
      >
        +
      </button>

      <button
        type="button"
        onClick={() => {
          Ringtone.volume -= 0.1;
        }}
      >
        -
      </button>

      <button
        type="button"
        onClick={() => {
          PhoneConfig.phoneNumber = '000-00-00';
        }}
      >
        номер 0
      </button>

      <button
        type="button"
        onClick={() => {
          PhoneConfig.phoneNumber = '111-11-11';
        }}
      >
        номер 1
      </button>
    </div>
  );
};
