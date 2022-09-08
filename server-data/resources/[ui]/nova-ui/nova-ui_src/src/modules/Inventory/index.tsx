// core
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
// components
import API from 'API';
import LocalStorage from 'utils/LocalStorage';
import AppStore from 'modules/App/Storage';
import { Inventory, PlayerInventory, Window } from './Components';
// utils
import InventoryStore from './Storage';

const InventoryAppProto = (): JSX.Element => {
  useEffect(() => {
    AppStore.refs.app.current.focus();
  }, []);

  const onInventoryCloseClick = (e: { preventDefault: () => void }, id: string | number) => {
    e.preventDefault();
    InventoryStore.setInventoryOpen(id, false);
  };

  const { inventories } = InventoryStore;

  if (Object.keys(inventories).every(key => !inventories[key].open)) {
    API.query('close', {});
  }

  return (
    <>
      {Object.entries(inventories).map(([key, inventory]) => {
        // FIXME
        if (!inventory.open) return null;

        if (inventory.category === 'player-inventory') {
          return (
            <PlayerInventory
              key={key}
              title="Игрок"
              id={key}
              {...LocalStorage.getInventoryPos(inventory)}
              weight={inventory.weight}
              maxWeight={inventory.maxWeight}
              focused={inventory.focused || false}
              gridSize={60}
              onClose={onInventoryCloseClick}
              inventories={inventories}
            />
          );
        }

        return (
          <Window
            key={key}
            id={key}
            title={inventory.title}
            {...LocalStorage.getInventoryPos(inventory)}
            focused={inventory.focused}
            weight={inventory.weight}
            maxWeight={inventory.maxWeight}
            onClose={onInventoryCloseClick}
          >
            <Inventory id={key} inventory={inventory} singleItem={false} gridSize={16} />
          </Window>
        );
      })}
    </>
  );
};
export const InventoryApp = observer(InventoryAppProto);
export default InventoryApp;
