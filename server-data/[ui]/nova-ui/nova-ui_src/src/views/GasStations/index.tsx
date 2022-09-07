import React from 'react';
import s from 'views/devViewsControls.local.scss';
import GasStationsStore from 'modules/GasStations/Storage'; // FIXME: delete on prod
import { toJS } from 'mobx';
import GasStationModule from '~m/GasStations';

const GasStations = (): JSX.Element => {
  const onClick = e => {
    // FIXME: delete on prod
    e.preventDefault();
    GasStationsStore.brand = e.target.innerText;
    console.log(toJS(GasStationsStore));
  };

  return (
    <>
      <GasStationModule />
      {DEVELOPMENT && (
        <div className={s.Controls}>
          <button type="button" onClick={e => onClick(e)}>
            xero
          </button>
          <button type="button" onClick={e => onClick(e)}>
            globe
          </button>
          <button type="button" onClick={e => onClick(e)}>
            ron
          </button>
          <button type="button" onClick={e => onClick(e)}>
            ltd
          </button>
        </div>
      )}
    </>
  );
};

export default GasStations;
