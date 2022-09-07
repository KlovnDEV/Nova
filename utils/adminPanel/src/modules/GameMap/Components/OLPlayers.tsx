/* eslint-disable no-restricted-syntax */

import { Feature } from 'ol';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import * as olstyle from 'ol/style';
import { PlayerInfo } from '../PlayerInfo';

const iconStyle = new olstyle.Style({
  image: new olstyle.Circle({
    radius: 6,
    stroke: new olstyle.Stroke({
      color: '#fff',
    }),
    fill: new olstyle.Fill({
      color: '#3399CC',
    }),
  }),
});

const labelStyle = new olstyle.Style({
  text: new olstyle.Text({
    font: '16px Calibri,sans-serif',
    offsetY: -13,
    overflow: true,
    fill: new olstyle.Fill({
      color: '#000',
    }),
    stroke: new olstyle.Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});

const strokeStyle = new olstyle.Style({
  stroke: new olstyle.Stroke({
    color: '#09fa',
    width: 3,
  }),
});

const style = [iconStyle, labelStyle, strokeStyle];

export class OLPlayers {
  readonly layer: VectorLayer<VectorSource<any>>;

  source: VectorSource<any>;

  constructor() {
    this.source = new VectorSource({
      features: [],
    });
    this.layer = new VectorLayer({
      source: this.source,
      style: function (feature) {
        const featureType = feature.get('type');

        if (featureType === 'player') {
          const player = feature.get('player');

          if (player) {
            const health = player.status?.health;
            let color = `rgb(0, 150, 255)`;

            if (health < 2) {
              color = `rgb(200, 0, 0)`;
            } else if (health < 50) {
              color = `rgb(230, ${50 + health * 3}, 0)`;
            }

            iconStyle.setImage(
              new olstyle.Circle({
                radius: 6,
                stroke: new olstyle.Stroke({
                  color: '#fff',
                }),
                fill: new olstyle.Fill({
                  color: color,
                }),
              }),
            );
          }
          labelStyle.getText().setText(feature.get('name'));
        } else {
          labelStyle.getText().setText('');
        }

        return style;
      },
    });
  }

  addPlayer(player: PlayerInfo): void {
    if (!player.points || player.points.length < 1) return;
    const currentPoint = player.points[0];

    const currentPositionFeature = new Feature({
      type: 'player',
      identifier: player.identifier,
      player: player,
      geometry: new Point(currentPoint),
      name: `${player.firstname} ${player.lastname}`,
    });

    this.source.addFeature(currentPositionFeature);

    const lastPositionFeature = new Feature({
      geometry: new LineString(player.points),
    });

    this.source.addFeature(lastPositionFeature);
  }

  update(players: Map<string, PlayerInfo>): void {
    this.source.clear();
    players.forEach(player => this.addPlayer(player));
  }
}

export default OLPlayers;
