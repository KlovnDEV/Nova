import React, { useState } from 'react';
import { observer } from 'mobx-react';
// components
import ViewfindFrame from 'assets/img/viewfinder.svg';
// store
import { MainStore } from 'storage/MainStore';
// styles
import { API, sleep } from 'utils';
import s from './Photo.module.scss';
// utils

const PhotoProto = (): JSX.Element => {
  const [showFrame, setShowFrame] = useState(true);
  const PhotoAddHandler = async (): Promise<void> => {
    setShowFrame(false);
    await sleep(100);
    API.query('takePhotoEnd', { photo: true, url: process.env.IMAGEHOST_URI }).then(res => {
      MainStore.onPhotoHandler(res.data);
    });
    await sleep(100);
    MainStore.photoMode = false;
  };

  const CloseHandler = (): void => {
    API.query('takePhotoEnd', {});
    MainStore.photoMode = false;
  };

  return (
    <div className={s.Viewfinder}>
      <ViewfindFrame className={s.Frame} style={{ opacity: showFrame ? 1 : 0 }} />
      <div className={s.Controls}>
        <button type="button" onClick={PhotoAddHandler} className={s.Button}>
          Снять
        </button>
        <button type="button" onClick={CloseHandler} className={s.Button}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export const Photo = observer(PhotoProto);
export default observer(PhotoProto);
