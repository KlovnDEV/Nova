/* eslint-disable no-restricted-syntax */
import React, { useEffect, useRef, useState } from 'react';

import Storage from 'modules/App/Storage';
import { observer } from 'mobx-react';

import MousePosition from 'ol/control/MousePosition';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Projection from 'ol/proj/Projection';
import { createStringXY } from 'ol/coordinate';
import { defaults as defaultControls } from 'ol/control';
import { addProjection } from 'ol/proj';

import { autorun } from 'mobx';
import s from '../index.local.scss';
import { OLPlayers } from './OLPlayers';
import { PlayerInfo } from '../PlayerInfo';

export const OLMap = observer(
  ({
    onClick,
  }: {
    onClick: (e: MouseEvent, player: PlayerInfo, x: number, y: number) => void;
  }): JSX.Element => {
    const mapRef = useRef<HTMLDivElement>(null);
    const coordsRef = useRef<HTMLDivElement>(null);

    const [players] = useState(new OLPlayers());

    useEffect(() => {
      const projection = new Projection({
        code: 'GTA',
        units: 'm',
        extent: [-5703, -4049, 6003, 8381],
      });

      addProjection(projection);

      const mousePosition = new MousePosition({
        coordinateFormat: createStringXY(0),
        projection: projection,
        className: 'custom-mouse-position',
        target: coordsRef.current,
      });

      const baseLayer = new TileLayer({
        source: new XYZ({
          url: 'assets/img/map/{z}-{x}-{y}.png',
          maxZoom: 5,
          minZoom: 0,
          wrapX: false,
          cacheSize: 1000,
          projection: projection,
          imageSmoothing: true,
        }),
      });

      const map = new Map({
        controls: defaultControls().extend([mousePosition]),
        layers: [baseLayer, players.layer],
        view: new View({
          center: [0, 0],
          projection: projection,
          extent: [-16000, -16000, 16000, 16000],
          zoom: 2,
        }),
      });

      map.setTarget(mapRef.current);

      map.on(['click', 'contextmenu'], evt => {
        const feature = map.forEachFeatureAtPixel(evt.pixel, f =>
          f.get('type') == 'player' ? f : null,
        );

        const coords = map.getCoordinateFromPixel(evt.pixel);

        if (onClick) onClick(evt.originalEvent, feature?.get('player'), coords[0], coords[1]);
      });
    }, []);

    autorun(() => {
      players.update(Storage.players);
    });

    return (
      <>
        <div className={s.map__body} ref={mapRef} />
        <div ref={coordsRef} className={s.map__coords} />

        {Storage.teleportMode && (
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              width: '100%',
              textShadow: '1px 1px 1px black',
            }}
          >
            <p>Выберите точку для телепортации нажатием левой кнопки мыши на карте</p>
            <p style={{ color: '#fcc' }}>Нажмите ESC или правую кнопку мыши для отмены</p>
          </div>
        )}
      </>
    );
  },
);

export default OLMap;
