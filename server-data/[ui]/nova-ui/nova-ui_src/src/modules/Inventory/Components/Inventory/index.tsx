// core
import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import API from 'API';
// component
import { Item } from '~m/Inventory/Components/Item';
import { Droppable } from '~m/Inventory/Components/Droppable';
import T from '~m/Inventory/types';
// style
import s from './index.local.scss';
// storage
import Storage from '~m/Inventory/Storage';
import AppStorage from '~m/App/Storage';

interface IProps {
  id: string;
  inventory: T.Inventory;
  singleItem: boolean;
  gridSize: number;
  className?: string | string[];
}

const Inventory = observer(
  ({ id, inventory, singleItem, gridSize, className }: IProps): JSX.Element => {
    const onDrop = (
      dropData: { category: string; name: string; invId: string | number; uid: string | number },
      pos: { x: number; y: number },
    ): void => {
      let x = Math.floor(pos.x / gridSize);
      let y = Math.floor(pos.y / gridSize);

      if (x < 0) x = 0;
      if (y < 0) y = 0;

      if (inventory.width <= x) x = inventory.width - 1;
      if (inventory.height <= y) y = inventory.height - 1;
      // console.log(x, y);

      if (inventory.singleItem && inventory.areas) {
        const areaKey = Object.keys(inventory.areas).find(
          key => inventory.areas[key].x === x && inventory.areas[key].y === y,
        );
        if (areaKey) {
          const area = inventory.areas[areaKey];
          if (
            area &&
            (!area.tags ||
              area.tags.includes(dropData.category) ||
              area.tags.includes(dropData.name))
          ) {
            Storage.onItemMove(dropData.invId, id, dropData.uid, x, y);
          }
        }
      } else {
        Storage.onItemMove(dropData.invId, id, dropData.uid, x, y);
      }

      AppStorage.previewPosition = null;
      AppStorage.currentPreview = null;
    };

    const onHover = (dropData: unknown, pos: { x: number; y: number }): void => {
      AppStorage.previewPosition = pos;
      AppStorage.currentPreview = dropData;
    };

    const onItemActionClick = (
      _e: unknown,
      item: T.InventoryItem,
      action: T.InventoryItemAction,
    ): void => {
      AppStorage.showPopup(null);

      API.query('inventory_action_do', {
        item: item,
        inventory: inventory,
        action: action.key,
      }).catch(function (e) {
        console.error(e);
      });
    };

    const openItemActionMenu = (e: React.SyntheticEvent, item: T.InventoryItem) => {
      if (!item.actions) {
        return null;
      }
      const actions = item.actions[inventory.actionGroup || inventory.category];
      if (!actions || actions.length === 0) {
        return null;
      }
      const sortedActions = [] as Array<T.InventoryItemAction>;
      Object.keys(actions).forEach(key => {
        sortedActions.push({
          key: key,
          ...actions[key],
        });
      });

      sortedActions.sort((a, b) => {
        return b.priority - a.priority;
      });

      AppStorage.showPopup({
        anchor: e.currentTarget,
        menu: sortedActions.map(act => ({
          name: act.key,
          label: act.label,
          onClick: r => onItemActionClick(r, item, act),
        })),
        onClose: () => AppStorage.showPopup(null),
      });

      return true;
    };

    return (
      <Droppable
        onDrop={onDrop}
        onHover={onHover}
        accept={['inv-item']}
        className={classNames(s.Inventory, className)}
        style={{
          gridTemplateColumns: `repeat(${inventory.width}, ${gridSize}px)`,
          gridTemplateRows: `repeat(${inventory.height}, ${gridSize}px)`,
        }}
      >
        {Object.values(inventory.items).map((item): JSX.Element => {
          return (
            <Item
              key={item.uid}
              invId={id}
              item={item}
              width={singleItem ? 1 : item.width || 1}
              height={singleItem ? 1 : item.height || 1}
              x={item.x || 0}
              y={item.y || 0}
              onRightClick={openItemActionMenu}
            />
          );
        })}
      </Droppable>
    );
  },
);

export { Inventory };
export default Inventory;
