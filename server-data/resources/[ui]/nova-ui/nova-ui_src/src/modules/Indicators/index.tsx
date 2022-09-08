import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Icon } from 'libs/UI';
import AppStorage from 'modules/App/Storage';
import { Micro, Indicator } from './Components';
import s from './index.local.scss';
import Storage from './Storage';

const interpolate = (color1, color2, value) => {
  const color = [];
  for (let i = 0; i < 3; i += 1) {
    color[i] = Math.round((color2[i] - color1[i]) * value + color1[i]);
  }
  return color;
};

const interpolateMap = (colors, value) => {
  const count = colors.length - 1;
  const step = Math.floor(value * count);
  if (step === count) return colors[count];
  const L = step / count;
  const R = (step + 1) / count;
  const blendRatio = (value - L) / (R - L);
  return interpolate(colors[step], colors[step + 1], blendRatio);
};

const SpeedometerIndicator = () => {
  const showSpeedometer = Storage.Car.speed !== undefined && Storage.Car.speed !== null;

  Storage.isLocationVisible =
    AppStorage.currentLocation !== '/craft' && AppStorage.currentLocation !== '/skin';

  return (
    <div className={s.Speedometer} style={{ opacity: showSpeedometer ? 1 : 0 }}>
      <Indicator
        className={s.Fuel}
        icon="car-fuel-indicator"
        value={Storage.Car.fuel || 0}
        color="#fff6"
      />
      <Indicator
        width={80}
        className={s.Speed}
        value={showSpeedometer ? Storage.Car.speed / 300.0 : 0}
        color="#fff6"
      >
        <div style={{ position: 'absolute' }}>
          <p className={s.SpeedometerValue}>{Math.floor(Storage.Car.speed)}</p>
          <p className={s.SpeedometerText}>км/ч</p>
        </div>
      </Indicator>
      <Indicator
        className={classNames(s.Belt, Storage.Car.belt < 0 ? s.Hidden : null)}
        icon="car-belt-indicator"
        value={1}
        color={Storage.Car.belt > 0 ? '#fff6' : '#f339'}
      />
    </div>
  );
};

const Speedometer = observer(SpeedometerIndicator);

const IndicatorsBar = (): JSX.Element => {
  const { IndicatorsMap, ColorsMap, Minimap, Voice, Location } = Storage;

  const getMapPos = (pos: number): 0 | '17%' | '34%' => {
    switch (pos) {
      case 0:
        return 0;
      case 1:
        return '17%';
      case 2:
        return '34%';
      default:
        return 0;
    }
  };

  return (
    <>
      <div
        className={classNames(
          s.RightBar,
          AppStorage.isPlayerInfoVisible ? s.RightBarOnPlayerInfo : null,
        )}
      >
        {Object.entries(Storage.Buffs)
          .sort((a, b) => a[1].startTime - b[1].startTime)
          .map(([name, args]) => {
            return (
              <div key={name} className={s.Buff}>
                <Icon name={`buff-${name}`} />
              </div>
            );
          })}
      </div>
      <div className={s.IndicatorsWrapper}>
        <div
          className={s.LocationWrapper}
          style={{
            left: getMapPos(Minimap),
            opacity: Storage.isLocationVisible ? 1 : 0,
          }}
        >
          <Micro
            className={s.Micro}
            mode={Voice.proximity}
            color={Voice.talking ? '#ffff' : '#fffa'}
          />
          <p className={s.Date}>
            <span>{Location.time}</span>
            <span>{Location.day}</span>
            <span>{Location.weather}</span>
          </p>
          <p className={s.Location}>
            <span>{Location.direction}</span>
            <span>{Location.street}</span>
          </p>
        </div>
        <Speedometer />
        <div className={s.Indicators}>
          {IndicatorsMap.map(ind => {
            const value = Storage.IndicatorsValues[ind.name];
            if (typeof value !== 'number') return null;

            return (
              <Indicator
                key={ind.name}
                icon={`${ind.name}-indicator`}
                value={value}
                className={classNames(
                  !AppStorage.isPlayerInfoVisible && (value > ind.range[1] || value < ind.range[0])
                    ? s.Hidden
                    : null,
                  s.Indicator,
                )}
                color={`rgb(${interpolateMap(ColorsMap, Math.min(Math.max(value, 0), 1)).join(
                  ',',
                )})`}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export const Indicators = observer(IndicatorsBar);
export default Indicators;
