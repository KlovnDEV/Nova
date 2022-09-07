/* eslint-disable camelcase */
// core
import React from 'react';
import { observer } from 'mobx-react';
// component
import { Icon } from 'libs/UI';
import { Inventory } from 'modules/Inventory/Components/Inventory';
import { Window } from 'modules/Inventory/Components/Inventory/Window';
import { WeightIndicator } from 'modules/Inventory/Components/Inventory/WeightIndicator';
import T from 'modules/Inventory/types';
// style
import s from './index.local.scss';

interface IProps {
  inventories: T.Inventories;
  title: string;
  id: string;
  x: number;
  y: number;
  gridSize: number;
  weight: number;
  maxWeight: number;
  focused: boolean;
  onClose?: { (e: React.SyntheticEvent, id: string): void };
  style?: React.CSSProperties;
  isInCraft?: boolean;
}

enum Lookup {
  hand_l = 'Левая рука',
  hand_r = 'Правая рука',
  head = 'Голова',
  mask = 'Маска',
  glasses = 'Очки',
  ears = 'Уши',
  neck = 'Шея',
  back = 'Рюкзак',
  torso = 'Торс',
  armor = 'Бронежилет',
  belt = 'Пояс',
  gloves = 'Перчатки',
  accs = 'Аксессуары',
  pants = 'Ноги',
  shoes = 'Обувь',
  phone = 'Телефон',
}

const PlayerInv = ({
  title,
  id,
  x,
  y,
  focused,
  onClose,
  inventories,
  gridSize,
  isInCraft = false,
  weight,
  maxWeight,
}: IProps): JSX.Element => {
  const inventory = inventories[id];

  if (!inventory) {
    return null;
  }

  const sortedInvs = Object.entries(inventory.areas).sort((a, b) => a[1].id - b[1].id);

  const PlayerSortInv = sortedInvs.map(([key]) => (
    <div data-key={key} key={key} className={s.InventoryCell}>
      <Icon className={s.InventoryCellIcon} name={`inv-${key}`} />
    </div>
  ));

  return (
    <Window
      id={id}
      title={title}
      x={x}
      y={y}
      focused={focused}
      weight={weight}
      maxWeight={maxWeight}
      onClose={onClose}
    >
      <div className={s.Wrapper}>
        <div className={s.PlayerInventories}>
          {PlayerSortInv}
          <Inventory
            singleItem
            id={id}
            inventory={inventory}
            gridSize={gridSize}
            className={s.Inventory}
          />
        </div>
      </div>
      {!isInCraft && (
        <div className={s.InventoryInnerOuter}>
          {sortedInvs.map(([key, area]) => {
            const itemKey = Object.keys(inventory.items).find(
              itemId =>
                inventory.items[itemId] &&
                inventory.items[itemId].x === area.x &&
                inventory.items[itemId].y === area.y,
            );
            if (!itemKey) return null;
            const item = inventory.items[itemKey];
            if (!item || !item.extra) return null;
            const itemInventoryId = Object.keys(inventories).find(
              invId =>
                inventories[invId].category === `item-${item.category}` &&
                inventories[invId].identifier == item.extra.inventory,
            );
            if (!itemInventoryId) return null;
            const itemInventory = inventories[itemInventoryId];
            if (!itemInventory) return null;

            return (
              <div className={s.InventoryInner} data-key={Lookup[key]} key={key}>
                <WeightIndicator value={itemInventory.weight} maxValue={itemInventory.maxWeight} />
                <Inventory
                  id={itemInventoryId}
                  inventory={itemInventory}
                  gridSize={16}
                  singleItem={false}
                />
              </div>
            );
          })}
        </div>
      )}
    </Window>
  );
};

export const PlayerInventory = observer(PlayerInv);
export default PlayerInventory;
