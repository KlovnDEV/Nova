import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import { imgReader } from 'utils/fileReaders';
// components
import { Card, LineProgress } from 'libs/UI';
// styles
import API from 'API';
import s from './index.local.scss';
// storage
import Store from './Storage';

const stations = imgReader(
  require.context(`${ASSETS}/img/gas-station/`, true, /^assets.*\.(png)$/),
);

const GasStation = () => {
  const btnCls = [
    Store.brand === 'xero' ? s.ButtonXero : null,
    Store.brand === 'ron' ? s.ButtonRON : null,
    Store.brand === 'globe' ? s.ButtonGlobe : null,
    Store.brand === 'ltd' ? s.ButtonLTD : null,
  ];

  // const bg = stations.find(station => station.originalPath === Store.background).originalPath;

  return (
    <div className={s.Wrapper}>
      <Card
        className={classNames(s[Store.brand], s.Card)}
        background={Store.background}
        width={500}
        height={300}
      >
        <div className={s.Body}>
          <div className={s.Title}>{Store.title}</div>
          <div className={s.Descr}>{Store.description}</div>

          <div className={s.Info}>
            <div className={s.InfoLeft}>
              <div>
                <p className={s.InfoHeader}>Хранилище</p>
                <div className={s.IndicatorWrapper}>
                  <p className={s.IndicatorText}>{`${Math.round(Store.amount)} / ${Math.round(
                    Store.capacity,
                  )} m³`}</p>
                  <LineProgress
                    maxValue={Store.capacity}
                    value={Store.amount}
                    backgroundImage={Store.progress}
                    className={s.Indicator}
                  />
                </div>
              </div>

              <div>
                <p className={s.InfoHeader}>Танкер</p>
                <div className={s.IndicatorWrapper}>
                  <p className={s.IndicatorText}>{`${Math.round(Store.tankerAmount)} / ${Math.round(
                    Store.tankerCapacity,
                  )} m³`}</p>
                  <LineProgress
                    maxValue={Store.tankerCapacity || 10}
                    value={Store.tankerAmount}
                    backgroundImage={Store.progress}
                    className={s.Indicator}
                  />
                </div>
              </div>
            </div>

            <div className={s.InfoRight}>
              <button
                type="button"
                className={classNames(s.Button, btnCls)}
                onClick={() => {
                  API.query('gasstation/pump', { brand: Store.brand, index: Store.index });
                }}
              >
                Наполнить
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const GasStations = observer(GasStation);

export default GasStations;
