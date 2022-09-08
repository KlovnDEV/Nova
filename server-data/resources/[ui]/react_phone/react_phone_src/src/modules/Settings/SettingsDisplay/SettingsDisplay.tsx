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

export function SettingsDisplay(): JSX.Element {
  const [isCustomBackDialogOpen, setCustomBackDialogOpen] = useState(false);
  const [customWallpaperText, setCustomWallpaperText] = useState(PhoneConfig.backgroundImage);
  const customWallpaperInputRef = useRef<HTMLInputElement>();
  const [focusState] = useFocusMap('bg');

  const setWallpaper = path => {
    PhoneConfig.backgroundImage = path;
  };

  const setZoom = value => {
    PhoneConfig.zoom = value;
  };

  const setCover = value => {
    PhoneConfig.cover = value;
  };

  return (
    <>
      <Dialog
        title="Изменить обои"
        isOpen={isCustomBackDialogOpen}
        onApply={() => {
          setCustomBackDialogOpen(false);
          setWallpaper(customWallpaperText);
        }}
        onCancel={() => {
          setCustomBackDialogOpen(false);
        }}
      >
        <p>Вставьте ссылку на изображение</p>
        <TextField
          style={{
            color: '#fff',
          }}
          fullWidth
          variant="flat"
          inputRef={customWallpaperInputRef}
          label="URL изображения"
          onChange={e => setCustomWallpaperText(e.target.value)}
          value={customWallpaperText}
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
              {PhoneConfig.backgroundsAvailable.map(([path, name], index) => (
                <MenuListItem
                  tabIndex={index}
                  key={path}
                  name={name}
                  focus={{
                    name: `bg${index}`,
                    left: 'bg',
                    up: `bg${index - 1}`,
                    down: `bg${index + 1}`,
                  }}
                  onClick={() => {
                    setWallpaper(`assets/img/background/${path}`);
                  }}
                />
              ))}

              <MenuListItem
                name="Custom URL..."
                tabIndex={-1}
                focus={{
                  name: `bg${PhoneConfig.backgroundsAvailable.length}`,
                  left: 'bg',
                  up: `bg${PhoneConfig.backgroundsAvailable.length - 1}`,
                }}
                onClick={() => {
                  setCustomBackDialogOpen(true);
                  if (customWallpaperInputRef.current) {
                    customWallpaperInputRef.current.focus();
                  }
                }}
              />
            </>
          }
        >
          <MenuListItem
            tabIndex={1}
            name="Обои"
            icon="Wallpaper"
            focus={{ name: 'bg', enter: 'bg0', down: 'zoom' }}
          />
        </Accordion>
        <Accordion
          content={
            <>
              {PhoneConfig.zoomAvailable.map((val, index) => (
                <MenuListItem
                  key={val}
                  name={val}
                  tabIndex={index}
                  focus={{
                    name: `zoom${index}`,
                    left: 'zoom',
                    up: `zoom${index - 1}`,
                    down: `zoom${index + 1}`,
                  }}
                  onClick={() => {
                    setZoom(val);
                  }}
                />
              ))}
            </>
          }
        >
          <MenuListItem
            tabIndex={2}
            focus={{ name: 'zoom', up: 'bg', enter: 'zoom0', down: 'cover' }}
            name="Масштаб изображения на экране"
            icon="VolumeUp"
          />
        </Accordion>

        <Accordion
          content={
            <>
              {PhoneConfig.coverAvailable.map(([val, name], index) => (
                <MenuListItem
                  key={val}
                  name={name}
                  tabIndex={index}
                  focus={{
                    name: `cover${index}`,
                    left: 'cover',
                    up: `cover${index - 1}`,
                    down: `cover${index + 1}`,
                  }}
                  onClick={() => {
                    setCover(val);
                  }}
                />
              ))}
            </>
          }
        >
          <MenuListItem
            tabIndex={3}
            name="Обложка"
            icon="VolumeUp"
            focus={{ name: 'cover', enter: 'cover0', up: 'zoom' }}
          />
        </Accordion>
      </Page>
    </>
  );
}

export default SettingsDisplay;
