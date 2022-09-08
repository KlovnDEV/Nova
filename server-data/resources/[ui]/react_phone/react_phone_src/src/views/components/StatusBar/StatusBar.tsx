// core
import React from 'react';
import { observer } from 'mobx-react';
// storage
import PhoneConfig from 'storage/PhoneConfig';
// style
import './StatusBar.scss';
// FIXME: проставить типы
export function StatusBarProto(props): JSX.Element {
  const { variant } = props;
  const { phoneNumber } = PhoneConfig;
  const batteryValue = 0.5;
  const signalValue = 0.6;
  const timeValue = new Date().toLocaleTimeString('ru-ru', { hour: '2-digit', minute: '2-digit' });

  // eslint-disable-next-line react/destructuring-assignment
  let backColor = props.backColor || 'transparent';
  // eslint-disable-next-line react/destructuring-assignment
  let frontColor = props.frontColor || '#fff';
  // eslint-disable-next-line react/destructuring-assignment
  let iconBackColor = props.iconBackColor || '#666';

  if (variant === 'dark') {
    backColor = '#222';
    frontColor = '#fff';
    iconBackColor = '#666';
  }

  if (variant === 'light') {
    backColor = '#fff';
    frontColor = '#222';
    iconBackColor = '#999';
  }

  return (
    <div className="status-bar" style={{ backgroundColor: backColor, color: frontColor }}>
      <div className="status-bar__leftpane">#{phoneNumber}</div>

      <div className="status-bar__rightpane">
        {/* signal icon */}
        <svg className="status-bar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <clipPath id="value-clip">
              <rect x="0" y="0" width={signalValue * 100} height="100" />
            </clipPath>
          </defs>
          <polygon fill={iconBackColor} points="0,100 100,0 100,100" />
          <polygon fill={frontColor} points="0,100 100,0 100,100" clipPath="url(#value-clip)" />
        </svg>

        {/* battery icon */}
        <svg className="status-bar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 110">
          <polygon
            id="back"
            style={{ fill: iconBackColor }}
            points="45,12 45,1 12,1 12,12 1,12 1,109 55,109 55,12"
          />
          <rect
            id="energy"
            x="1"
            y="8"
            style={{ fill: frontColor }}
            width="54"
            height="100"
            transform-origin="bottom center"
            transform={`scale(1 ${batteryValue})`}
          />
        </svg>
        <div className="status-bar__time">{timeValue}</div>
      </div>
    </div>
  );
}

export const StatusBar = observer(StatusBarProto);

export default observer(StatusBarProto);
