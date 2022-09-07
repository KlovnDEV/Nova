// core
import React, { useRef } from 'react';
// utils
import { useViewport } from 'utils/useViewport';
// style
import s from './index.local.scss';

type IProps = { left: number; top: number; width: number; height: number; itemName: string };
const Preview = ({ left, top, width, height, itemName }: IProps): JSX.Element => {
  const icon = useRef();
  const { vw, vh } = useViewport();

  const getBounds = (
    screenPos: number,
    viewportDimension: number,
    itemDimension: number,
  ): number => {
    let position: number = screenPos;
    if (position > viewportDimension - itemDimension) {
      position = viewportDimension - itemDimension;
    }

    return position;
  };

  return (
    <img
      ref={icon}
      className={s.Preview}
      src={`${ASSETS}/svg/icons/${itemName}.svg`}
      // onError={() => {
      //   (icon.current as HTMLImageElement).src = `${ASSETS}/img/icons/${itemName}.png`;
      // }}
      alt=""
      style={{
        left: getBounds(left, vw, 16 * width),
        top: getBounds(top, vh, 16 * height),
        width: 16 * width,
        height: 16 * height,
      }}
    />
  );
};

export { Preview };
export default Preview;
