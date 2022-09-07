/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
// styles
import API from 'API';
import Storage from 'modules/App/Storage';
import { observer } from 'mobx-react';
// import Map from '../../assets/svg/gtavmap.svg';

import { observe } from 'mobx';

import s from './index.local.scss';
import { OLMap } from './Components/OLMap';
import { PlayerPanel } from './Components/PlayerPanel';
import { PlayerInfo } from './PlayerInfo';

export const GameMap = observer((): JSX.Element => {
  // const [selectedPlayer, setSelectedPlayer] = useState(null);

  function updatePlayer(player: PlayerInfo) {
    API.query('stats/player/get', { identifier: player.identifier, last: true }).then(stats => {
      const stplayer = Storage.players.get(player.identifier);
      if (stplayer) {
        if (stats.data[0]) {
          const stdata = JSON.parse(stats.data[0].status);
          stplayer.status.replace(stdata);
        }

        const points = stats.data.map(row => {
          return [row.x, row.y];
        });

        stplayer.points.replace(points);
      }
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      API.query('users/summary', { connected: true }).then(playersReply => {
        if (playersReply.status == 200) {
          const playersData = playersReply.data as any[];

          for (const player of playersData) {
            if (!Storage.players.has(player.identifier)) {
              const newPlayer = new PlayerInfo(player);
              Storage.players.set(player.identifier, newPlayer);

              observe(newPlayer, () => {
                console.log('player changed', newPlayer.identifier, Storage.players.size);
              });
            } else {
              // Object.assign(Storage.players.get(player.identifier), player);
            }
          }

          Storage.players.forEach(player => {
            const stillExist = Object.values(playersData).find(
              val => val.identifier === player.identifier,
            );
            if (!stillExist) Storage.players.delete(player.identifier);
          });
        }
      });

      Storage.players.forEach(player => updatePlayer(player));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onMapClick = (e: MouseEvent, player: PlayerInfo, x: number, y: number) => {
    if (Storage.teleportMode) {
      Storage.teleportMode = false;
      if (e.button == 0 && Storage.selectedPlayer) {
        console.log(Storage.selectedPlayer?.identifier, x, y);
        API.query('admin/commands/add', {
          cmd: JSON.stringify({
            name: 'teleport',
            identifier: Storage.selectedPlayer.identifier,
            x,
            y,
          }),
        });
      }

      return;
    }

    if (player) {
      Storage.selectedPlayer =
        Storage.selectedPlayer && player && Storage.selectedPlayer.identifier === player.identifier
          ? null
          : player;
    } else {
      Storage.selectedPlayer = null;
    }
  };

  return (
    <div className={s.map__wrapper}>
      <OLMap onClick={onMapClick} />
      <PlayerPanel player={Storage.selectedPlayer} />
    </div>
  );
});

export default GameMap;
