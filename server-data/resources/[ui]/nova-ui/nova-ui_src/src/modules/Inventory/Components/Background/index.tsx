// core
import React from 'react';
import { observer } from 'mobx-react';
// style
import API from 'API';
import s from './index.local.scss';
// utils
import { Droppable } from '~m/Inventory/Components/Droppable';
import Storage from '~m/Inventory/Storage';
import AppStorage from '~m/App/Storage';

// types
type IProps = {
  id: number;
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
  onRightClick: { (): void };
  style?: React.CSSProperties;
};

const DroppableBackground = (props: IProps): JSX.Element => {
  const { children, onClick, onRightClick, style, id } = props;

  const onDrop = (
    item: { type: string; id: string; invId: string | number; uid: string | number },
    pos: { x: number; y: number },
  ): void => {
    if (item.type === 'inv') {
      const left = Math.round(pos.x);
      const top = Math.round(pos.y);
      Storage.setInventoryPosition({ id: item.id, x: left, y: top });
    }

    if (item.type === 'inv-item') {
      const x = Math.round(pos.x / 16);
      const y = Math.round(pos.y / 16);
      Storage.onItemMove(item.invId, id, item.uid, x, y);
    }
  };

  const onHover = (
    item: { type: string; ref: { current: AnyObject } },
    pos: { x: number; y: number },
  ): void => {
    if (item.type === 'inv') {
      const left = Math.round(pos.x);
      const top = Math.round(pos.y);

      const domElem = item.ref.current;
      if (domElem) {
        domElem.style.left = `${left}px`;
        domElem.style.top = `${top}px`;
      }
    } else {
      AppStorage.previewPosition = pos;
      AppStorage.currentPreview = item;

      API.query('inventory_item_hover', {
        item: item,
        x: pos.x,
        y: pos.y,
        shift: AppStorage.isShiftDown,
        ctrl: AppStorage.isCtrlDown,
      }).catch(function () {
        /* do nothing */
      });
    }
  };

  const onContextMenu = (e: {
    target: { className: string };
    preventDefault: () => void;
  }): boolean => {
    if (e.target.className !== s.Droppable) {
      return false;
    }

    e.preventDefault();
    onRightClick();
    return true;
  };

  return (
    <Droppable
      accept={['inv', 'inv-item']}
      className={s.Droppable}
      onDrop={onDrop}
      onHover={onHover}
      onContextMenu={onContextMenu}
      onClick={onClick}
      style={style}
    >
      {children}
    </Droppable>
  );
};

export const InventoryDroppableBackground = observer(DroppableBackground);
export default InventoryDroppableBackground;
