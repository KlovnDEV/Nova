/* eslint-disable no-restricted-syntax */
import React, { useEffect, useRef, useState } from 'react';
// components
import { Button, Icon } from 'libs/UI';
// styles
import API from 'API';
import Storage from 'modules/App/Storage';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Draggable from 'react-draggable';
import { PlayerStatusRange } from './PlayerStatusRange';
import { PlayerInfo } from '../PlayerInfo';

import s from '../index.local.scss';

const i18n = {
  hunger: 'Голод',
  thirst: 'Жажда',
  strength: 'Сила',
  agility: 'Ловкость',
  endurance: 'Выносливость',
  intelligence: 'Интеллект',
  health: 'Здоровье',
  stress: 'Стресс',
  pain: 'Боль',
  'pain-high': 'Сильная боль',
  'trauma-fracture-lleg': 'Перелом левой ноги',
  'trauma-fracture-rleg': 'Перелом правой ноги',
  'trauma-dislocation-lleg': 'Вывих левой ноги',
  'trauma-dislocation-rleg': 'Вывих правой ноги',
};

export const PlayerPanel = observer(({ player }: { player: PlayerInfo }): JSX.Element => {
  if (!player) return null;
  const health = (player?.status?.get('health') || 0) - 1;

  const revive = () => {
    API.query('admin/commands/add', {
      cmd: JSON.stringify({
        name: 'revive',
        identifier: player.identifier,
      }),
    });
  };

  const statusList = Array.from(player.status).map(([key, val]) => {
    return (
      <tr key={key}>
        <td>{i18n[key] ?? key}</td>
        <td>
          <PlayerStatusRange
            key={key}
            min={0}
            max={100}
            value={val}
            onApply={value => {
              const cmd = {
                name: 'setstatus',
                identifier: player.identifier,
                key: key,
                value: value,
              };
              API.query('admin/commands/add', { cmd: JSON.stringify(cmd) });
            }}
          />
        </td>
      </tr>
    );
  });

  return (
    <Draggable handle="h1">
      <div className={s.playerpanel__wrapper}>
        <h1 style={{ width: '100%' }}>
          {player.firstname} {player.lastname}
        </h1>
        <div className={s.playerpanel__top}>
          <div>
            <p>
              <span>ID: </span>
              <span>{player.identifier}</span>
            </p>
            <p>
              <span>Здоровье: </span>
              <span>{health}</span>
            </p>
          </div>
          <div className={s.playerpanel__topbuttons}>
            <button type="button" onClick={revive} disabled={health > 0}>
              Revive
            </button>
            <button
              type="button"
              onClick={() => {
                Storage.teleportMode = !Storage.teleportMode;
              }}
            >
              Teleport
            </button>
          </div>
        </div>
        <div>
          <span>Статусы: </span>
          <span>
            <table className={s.playerpanel__statuses}>
              <tbody>{statusList}</tbody>
            </table>
          </span>
        </div>
      </div>
    </Draggable>
  );
});

export default PlayerPanel;
