// core
import React from 'react';
// ui
import { MenuListItem, Accordion } from 'libs/UI';
// components
import { Page, BottomBar } from 'views/components';
// utils
import { useFocusMap } from 'utils/FocusMap';
// storage
import PhoneConfig from 'storage/PhoneConfig';
// style
import '../Settings.scss';

export function SettingsSystem(): JSX.Element {
  const [focusState] = useFocusMap('lang');

  const setLanguage = lang => {
    PhoneConfig.language = lang;
  };

  return (
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
            {PhoneConfig.languagesAvailable.map(([code, name], index) => (
              <MenuListItem
                key={code}
                name={name}
                tabIndex={index}
                focus={{
                  name: `lang${index}`,
                  left: 'lang',
                  up: `lang${index - 1}`,
                  down: `lang${index + 1}`,
                }}
                onClick={() => {
                  setLanguage(code);
                }}
              />
            ))}
          </>
        }
      >
        <MenuListItem
          tabIndex={1}
          focus={{ name: 'lang', enter: 'lang0' }}
          name="Язык"
          icon="Wallpaper"
        />
      </Accordion>
    </Page>
  );
}

export default SettingsSystem;
