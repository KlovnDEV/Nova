/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import Preview from 'react-dnd-preview';
// components
import { Chat } from 'modules/Chat';
import { Menu } from 'modules/Menu';
import { Indicators } from 'modules/Indicators';
import { Notifications } from 'modules/Notifications';
import PlayerInfo from 'modules/PlayerInfo';
// components
import { PopupMenu, Tooltip } from 'components';
import {
  InventoryDroppableBackground,
  Preview as InventoryPreview,
} from 'modules/Inventory/Components';
// Storage
import PlayerInfoStore from 'modules/PlayerInfo/Storage';
import API from 'API';
import Storage from './Storage';
// utils
import DevControls from './Utils/DevControls';
import devEffect from './Utils/devEffect';
import Events from './Utils/Events';
// global styles
import 'scss/main.scss';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AppProto = ({ children }: IProps): JSX.Element => {
  const [theme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    Storage.currentLocation = location.pathname;
  }, [location]);

  useEffect(() => {
    Storage.refs.app = React.createRef();
  }, []);

  if (DEVELOPMENT) devEffect();

  const generatePreview = (data: {
    itemType: string;
    item: { width: number; height: number; name: string };
  }): JSX.Element => {
    if (data.itemType !== 'inv-item') {
      Storage.currentPreview = null;
      return null;
    }

    Storage.currentPreview = Storage.previewPosition && (
      <InventoryPreview
        left={Storage.previewPosition.x}
        top={Storage.previewPosition.y}
        width={data.item.width}
        height={data.item.height}
        itemName={data.item.name}
      />
    );
    return Storage.currentPreview;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    Storage.isShiftDown = e.shiftKey;
    Storage.isCtrlDown = e.ctrlKey;
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    Storage.isShiftDown = e.shiftKey;
    Storage.isCtrlDown = e.ctrlKey;

    if (e.key === 'Escape') {
      Storage.closeApp();
    }

    const keyNum = parseInt(e.key, 10);

    if (Storage.isPlayerInfoVisible && !Number.isNaN(keyNum)) {
      const slot = PlayerInfoStore.slots.find(sl => sl.id == keyNum);
      if (!slot) return;

      API.query('playerinfo/runAction', { slot });
    }
  };

  const mouseClickHandler = e => {
    if (e.target.tagName === 'DIV') {
      API.query('menu/click-background', {});
    }
  };

  return (
    <div
      ref={Storage.refs.app}
      role="presentation"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      className={`Theme Theme-${theme}`}
      style={{
        backgroundColor: process.env.NODE_ENV !== 'production' ? '#789' : '',
        // backgroundImage:
        //   process.env.NODE_ENV !== 'production'
        //     ? 'url(https://www.digiseller.ru/preview/469790/p1_50421233244830.JPG)'
        //     : '',
        backgroundSize: '100% 100%',
        opacity: Storage.isUIVisible ? 1 : 0,
      }}
    >
      <Chat />
      <Menu />
      <Events />
      <Notifications />
      <DndProvider
        backend={TouchBackend}
        options={{ enableMouseEvents: true, delay: 5, enableHoverOutsideTarget: true }}
      >
        <InventoryDroppableBackground
          id={-1}
          onRightClick={Storage.closeApp}
          onClick={mouseClickHandler}
        >
          <PlayerInfo />
          {children}
        </InventoryDroppableBackground>
        <Preview>{generatePreview}</Preview>
      </DndProvider>
      {DEVELOPMENT && <DevControls />}
      {Storage.popupMenu && <PopupMenu data={Storage.popupMenu} />}
      {Storage.tooltip && <Tooltip data={Storage.tooltip} />}
      <Indicators />
    </div>
  );
};

export default observer(AppProto);
