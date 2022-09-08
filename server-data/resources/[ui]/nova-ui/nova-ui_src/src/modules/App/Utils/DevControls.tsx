import React from 'react';
import { useHistory } from 'react-router-dom';
import AppStorage from 'modules/App/Storage';
import s from './DevControls.local.scss';

const DevControls = (): JSX.Element => {
  const history = useHistory();

  return (
    <div className={s.Controls}>
      <button type="button" onClick={() => history.push('/UIkit')}>
        ui kit
      </button>
      <button type="button" onClick={() => history.push('/animations')}>
        anim
      </button>
      <button type="button" onClick={() => history.push('/gasstations')}>
        GS
      </button>
      <button type="button" onClick={() => history.push('/clothesshop')}>
        CS
      </button>
      <button type="button" onClick={() => history.push('/menu')}>
        menu
      </button>
      <button type="button" onClick={() => history.push('/bank')}>
        bank
      </button>
      <button type="button" onClick={() => history.push('/skin')}>
        skin
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/craft');
        }}
      >
        craft
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/inventory');
        }}
      >
        inventory
      </button>
      <button
        type="button"
        onClick={() => {
          AppStorage.isPlayerInfoVisible = !AppStorage.isPlayerInfoVisible;
        }}
      >
        PI
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/death');
        }}
      >
        DeathScreen
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/shop');
        }}
      >
        Shop/Mall
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/mechanic_car');
        }}
      >
        Cars
      </button>
      <button
        onClick={() => {
          history.push('/Health');
        }}
      >
        Health
      </button>
    </div>
  );
};

export default DevControls;
