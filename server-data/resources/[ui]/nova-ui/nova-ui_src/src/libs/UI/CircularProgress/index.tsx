import React from 'react';
import { UICircularRange } from '../@types';

type IArc = {
  cx?: number;
  cy?: number;
  r?: number;
  fill: string;
  width: number;
  startAngle: number;
  endAngle: number;
};

const Arc = ({ cx, cy, r, fill, width, startAngle, endAngle }: IArc): JSX.Element => {
  const degToRad = (angle: number): number => (Math.PI / 180) * angle;

  const getCoords = (angle: number): [number, number] => {
    const x = cx + r * Math.cos(degToRad(angle));
    const y = cy + r * Math.sin(degToRad(angle));
    return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
  };

  const pathFabric = [];

  const [xs, ys] = getCoords(startAngle);
  pathFabric.push(`M${xs},${ys}`);

  for (let i = startAngle; i < endAngle; i += 10) {
    const [x, y] = getCoords(i);

    pathFabric.push(`L${x},${y}`);
  }

  const [x, y] = getCoords(endAngle);
  pathFabric.push(`L${x},${y}`);

  return (
    <path
      d={pathFabric.join(' ')}
      stroke={fill}
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
    />
  );
};

const CircularProgress = ({
  width,
  strokeWidth,
  value,
  fillProgress,
  fillBackground,
  className,
  angleRange = 270,
}: UICircularRange): JSX.Element => {
  const val = Math.min(Math.max(value, 0), 1);

  const startAngle = 270 - angleRange / 2;

  return (
    <svg width={width} height={width} className={className}>
      <Arc
        cx={width / 2}
        cy={width / 2}
        r={width / 2 - strokeWidth}
        width={strokeWidth}
        startAngle={startAngle}
        endAngle={startAngle + angleRange}
        fill={fillBackground}
      />
      <Arc
        cx={width / 2}
        cy={width / 2}
        r={width / 2 - strokeWidth}
        width={strokeWidth}
        startAngle={startAngle}
        endAngle={startAngle + val * angleRange}
        fill={fillProgress}
      />
    </svg>
  );
};

export { CircularProgress };
export default CircularProgress;
