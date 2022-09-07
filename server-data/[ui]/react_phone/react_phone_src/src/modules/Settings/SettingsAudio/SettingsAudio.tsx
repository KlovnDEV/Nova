// core
import React, { useState, useRef } from 'react';
// ui
import { MenuListItem, Accordion, TextField, Dialog } from 'libs/UI';
// components
import { Page, BottomBar } from 'views/components';
// utils
import { useFocusMap } from 'utils/FocusMap';
// storage
import PhoneConfig from 'storage/PhoneConfig';
// style
import '../Settings.scss';

export function SettingsAudio(): JSX.Element {
  const [isCustomRingtoneDialogOpen, setCustomRingtoneDialogOpen] = useState(false);
  const [customRingtoneText, setCustomRingtoneText] = useState(PhoneConfig.ringtone);
  const customRingtoneInputRef = useRef<HTMLInputElement>();
  const [focusState] = useFocusMap('ringtone');

  const setRingtone = path => {
    PhoneConfig.ringtone = path;
  };

  const setRingtoneVolume = value => {
    PhoneConfig.ringtoneVolume = value;
  };

  return (
    <>
      <Dialog
        title="Изменить рингтон"
        isOpen={isCustomRingtoneDialogOpen}
        onApply={() => {
          setCustomRingtoneDialogOpen(false);
          setRingtone(customRingtoneText);
        }}
        onCancel={() => {
          setCustomRingtoneDialogOpen(false);
        }}
      >
        <p>Вставьте ссылку на аудиофайл</p>
        <TextField
          style={{
            color: '#fff',
          }}
          fullWidth
          variant="flat"
          inputRef={customRingtoneInputRef}
          label="URL рингтона"
          onChange={e => setCustomRingtoneText(e.target.value)}
          value={customRingtoneText}
        />
      </Dialog>
      <Page
        className="settings__screen"
        backgroundBlur
        statusBar="light"
        bottomBar={<BottomBar variant="light" />}
        pageLayoutRef={focusState.ref}
        onKeyDown={e => focusState?.onKeyDown(e)}
      >
        <Accordion
          content={
            <>
              {PhoneConfig.ringtonesAvailable.map(([path, name], index) => (
                <MenuListItem
                  key={path}
                  name={name}
                  tabIndex={index}
                  focus={{
                    name: `ringtone${index}`,
                    left: 'ringtone',
                    up: `ringtone${index - 1}`,
                    down: `ringtone${index + 1}`,
                  }}
                  onClick={() => {
                    setRingtone(`assets/audio/${path}`);
                  }}
                />
              ))}

              <MenuListItem
                name="Custom URL..."
                tabIndex={PhoneConfig.ringtonesAvailable.length}
                focus={{
                  name: `ringtone${PhoneConfig.ringtonesAvailable.length}`,
                  left: 'ringtone',
                  up: `ringtone${PhoneConfig.ringtonesAvailable.length - 1}`,
                }}
                onClick={() => {
                  setCustomRingtoneDialogOpen(true);
                  if (customRingtoneInputRef.current) {
                    customRingtoneInputRef.current.focus();
                  }
                }}
              />
            </>
          }
        >
          <MenuListItem
            tabIndex={1}
            focus={{ name: 'ringtone', down: 'volume', enter: 'ringtone0' }}
            name="Рингтон"
            icon="Ringtone"
          />
        </Accordion>
        <Accordion
          content={
            <>
              {PhoneConfig.ringtoneVolumeAvailable.map((val, index) => (
                <MenuListItem
                  key={val}
                  name={`${Math.floor(val * 100)}%`}
                  tabIndex={index}
                  focus={{
                    name: `volume${index}`,
                    left: 'volume',
                    up: `volume${index - 1}`,
                    down: `volume${index + 1}`,
                  }}
                  onClick={() => {
                    setRingtoneVolume(val);
                  }}
                />
              ))}
            </>
          }
        >
          <MenuListItem
            tabIndex={2}
            focus={{ name: 'volume', up: 'ringtone', enter: 'volume0' }}
            name="Громкость рингтона"
            icon="VolumeUp"
          />
        </Accordion>
      </Page>
    </>
  );
}

export default SettingsAudio;
