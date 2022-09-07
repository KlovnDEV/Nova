// core
import React from 'react';
import { useHistory } from 'react-router-dom';
// ui
import { MenuListItem } from 'libs/UI';
// components
import { Page, BottomBar } from 'views/components';
// utils
import { useFocusMap } from 'utils/FocusMap';
// style
import './Settings.scss';

export function Settings(): JSX.Element {
  const history = useHistory();
  const [focusState] = useFocusMap('menu0');

  return (
    <Page
      className="settings__screen"
      backgroundBlur
      statusBar="light"
      bottomBar={<BottomBar variant="light" />}
      pageLayoutRef={focusState.ref}
      onKeyDown={e => focusState?.onKeyDown(e)}
    >
      <MenuListItem
        tabIndex={1}
        focus={{ name: 'menu0', down: 'menu1' }}
        name="Экран"
        description="Обои, спящий режим, размер шифта"
        icon="Sun"
        onClick={() => {
          history.push('/settings/display');
        }}
      />
      <MenuListItem
        tabIndex={2}
        focus={{ name: 'menu1', down: 'menu2', up: 'menu0' }}
        name="Звук"
        description="Громкость, мелодия смс и звонка"
        icon="VolumeUp"
        onClick={() => {
          history.push('/settings/audio');
        }}
      />
      <MenuListItem
        tabIndex={3}
        focus={{ name: 'menu2', down: 'menu3', up: 'menu1' }}
        header="Система"
        description="Язык, исходный код сервера и мемы"
        icon="Settings"
        onClick={() => {
          history.push('/settings/system');
        }}
      />
    </Page>
  );
}

export default Settings;
