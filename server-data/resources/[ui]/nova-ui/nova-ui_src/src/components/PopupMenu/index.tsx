// core
import React, { MouseEventHandler } from 'react';
// components
import { ButtonGroup, Button } from 'libs/UI';
// styles
import { observer } from 'mobx-react';
import s from './index.local.scss';

type MenuElement = {
  name: string;
  label: string;
  onClick: { (e: React.SyntheticEvent, act: MenuElement): void };
};

export type PopupMenuProps = {
  anchor?: any;
  x?: number;
  y?: number;
  menu: MenuElement[];
  onClose?: MouseEventHandler<HTMLDivElement>;
};

const PopupMenuProto = ({ data }: { data: PopupMenuProps }): JSX.Element => {
  const { x, y, menu, onClose, anchor } = data;
  const { x: posX, y: posY } = anchor?.getBoundingClientRect() || {};

  if (!menu) return null;

  return (
    <div className={s.Layer} role="presentation" onClick={onClose} onContextMenu={onClose}>
      <ButtonGroup
        style={{
          top: y ?? posY,
          left: x ?? posX,
          width: 'auto',
          height: 'auto',
        }}
        className={s.Group}
        direction="row"
      >
        {menu.map(act => (
          <Button
            className={s.Button}
            key={act.name}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              act.onClick(e, act);
            }}
            variant="rect"
          >
            {act.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export const PopupMenu = observer(PopupMenuProto);
export default PopupMenu;
