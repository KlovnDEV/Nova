// core
import React, { useState } from 'react';
// components
import { Icon } from 'libs/UI';
import { Draggable } from 'modules/Inventory/Components/Draggable';
import T from 'modules/Inventory/types';
// storage
import AppStorage from 'modules/App/Storage';
// style
import s from './index.local.scss';

type IProps = {
  invId: string;
  item: T.InventoryItem;
  width: number;
  height: number;
  x: number;
  y: number;
  onClick?: { (e: React.SyntheticEvent, item: AnyObject): void };
  onRightClick?: { (e: React.SyntheticEvent, item: AnyObject): void };
};

const ItemProto = ({
  invId,
  item,
  width,
  height,
  x,
  y,
  onClick,
  onRightClick,
  ...rest
}: IProps): JSX.Element => {
  const [isDragging, setDragging] = useState(false);

  const inventoryItemClick = (e: React.SyntheticEvent): void => {
    if (onClick) onClick(e, item);
  };

  const inventoryItemRightClick = (e: React.SyntheticEvent): boolean => {
    e.preventDefault();
    onRightClick(e, item);
    return true;
  };

  const onCloseTooltip = () => {
    AppStorage.showTooltip(null);
  };

  const onShowTooltip = (e: React.SyntheticEvent) => {
    AppStorage.showTooltip({
      anchor: e.target,
      tip: {
        title: (
          <>
            {item?.label?.length ? <p>{item.label}</p> : <p>Неизвестно</p>}
            {item.description && <p>{item.description}</p>}
            {item.weight > 0.05 && (
              <p>
                Вес:&nbsp;
                {(item.weight * item.amount).toFixed(1)}
                &nbsp;кг
              </p>
            )}
          </>
        ),
      },
    });
  };

  return (
    <Draggable
      type="inv-item"
      onContextMenu={inventoryItemRightClick}
      onClick={inventoryItemClick}
      setDragging={setDragging}
      onMouseEnter={e => onShowTooltip(e)}
      onMouseLeave={() => onCloseTooltip()}
      data={{ ...item, invId }}
      className={s.Item}
      style={{
        opacity: isDragging ? 0 : 1,
        gridColumn: `${x + 1} / ${width + x + 1}`,
        gridRow: `${y + 1} / ${height + y + 1}`,
      }}
      {...rest}
    >
      {item.amount > 1 && <p className={s.Amount}>x{item.amount}</p>}
      <Icon
        name={[item.name, `category/${item.category}`, 'unknown']}
        className={s.Pic}
        data-identifier={item.category}
      />
    </Draggable>
  );
};

export const Item = ItemProto;
export default Item;
