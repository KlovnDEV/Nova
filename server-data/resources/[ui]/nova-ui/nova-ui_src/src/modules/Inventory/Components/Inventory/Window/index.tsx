// core
import React, { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames/bind';
// component
import { InventoryTitle } from '~m/Inventory/Components/Inventory/InventoryTitle';
// style
import s from './index.local.scss';
// storage
import InventoryStore from '~m/Inventory/Storage';
import { IDragItem } from '~m/Inventory/types';

type IProps = {
  title: string;
  id: string;
  x: number;
  y: number;
  weight: number;
  maxWeight: number;
  focused: boolean;
  children: React.ReactNode;
  onClose: { (e: React.SyntheticEvent, id: string): void };
};

const Window = ({
  title,
  id,
  x = 0,
  y = 0,
  weight,
  maxWeight,
  focused,
  children,
  onClose,
}: IProps): JSX.Element => {
  const [isDrag] = useState(false);
  const ref = useRef();

  const [, drag] = useDrag<IDragItem, unknown, unknown>({
    type: 'inv',
    item: { type: 'inv', id, ref: ref } as IDragItem,
    isDragging: monitor => {
      const delta = monitor.getSourceClientOffset();
      const left = Math.round(delta.x);
      const top = Math.round(delta.y);
      return InventoryStore.setInventoryPosition({ id, x: left, y: top });
    },
  });

  return (
    <div
      ref={ref}
      className={classNames(s.InventoryWrapper, isDrag ? s['is-dragging'] : null)}
      style={{ left: x, top: y, zIndex: focused ? 1 : 0 }}
    >
      <div role="presentation" ref={drag} className={s.Dragger}>
        <InventoryTitle
          title={title}
          weight={weight}
          maxWeight={maxWeight}
          onClose={onClose ? e => onClose(e, id) : null}
        />
      </div>
      {children}
    </div>
  );
};
export { Window };
export default Window;
