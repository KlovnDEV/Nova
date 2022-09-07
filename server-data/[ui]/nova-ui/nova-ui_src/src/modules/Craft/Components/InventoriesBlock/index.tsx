import React, { useState } from 'react';
// components
import { Tabs } from 'libs/UI';
import { Inventory, WeightIndicator, PlayerInventory } from 'modules/Inventory/Components';
// store
import CraftStore from 'modules/Craft/Storage';
import InventoryStore from 'modules/Inventory/Storage';
// styles
import s from './index.local.scss';
// types
import T from '~m/Inventory/types';

const Lookup = [
  {
    name: 'player-inventory',
    icon: 'man',
  },
  {
    name: 'item-bag',
    icon: 'inv-back',
  },
  {
    name: 'item-torso',
    icon: 'inv-torso',
  },
  {
    name: 'item-armor',
    icon: 'inv-armor',
  },
  {
    name: 'item-pants',
    icon: 'inv-pants',
  },
  {
    name: 'item-belt',
    icon: 'inv-belt',
  },
];

const InventoriesBlock = (): JSX.Element => {
  const { inventories } = InventoryStore;
  const [activeTab, setActiveTab] = useState('player-inventory');

  const findInv = (name: string): T.Inventory => {
    const fakeInv = Object.values(CraftStore.Inventories).find(inv => inv.category === name);
    if (!fakeInv) return null;
    return inventories[fakeInv.id];
  };

  const playerInv = findInv('player-inventory');

  const InnerInventory = ({ inv }: { inv: T.Inventory }): JSX.Element => (
    <>
      {inv.category === 'player-inventory' ? (
        <PlayerInventory
          title="Игрок"
          id={playerInv.id}
          x={0}
          y={0}
          focused={false}
          gridSize={60}
          inventories={inventories}
          weight={playerInv.weight}
          maxWeight={playerInv.maxWeight}
          isInCraft
        />
      ) : (
        <>
          <WeightIndicator value={inv.weight} maxValue={inv.maxWeight} />
          <Inventory id={inv.id} inventory={inv} gridSize={16} singleItem={inv.singleItem} />
        </>
      )}
    </>
  );

  const Inv = (category: { name: string; icon?: string }): JSX.Element => {
    const { name } = category;
    const targets =
      name !== 'player-inventory'
        ? Object.values(playerInv.items)
            .filter(item => `item-${item.category}` === name)
            .map(item => findInv(`item-${item.category}`))
        : [playerInv];

    return (
      <div className={s.Inventory} data-category={name} key={name}>
        {targets.map(inv =>
          inv ? <InnerInventory key={inv.id} inv={inv} /> : <p>Инвентарь не найден!</p>,
        )}
      </div>
    );
  };

  return (
    <aside className={s.ComponentWrapper}>
      <Tabs
        pages={Lookup}
        fade="right"
        controlFillColor="#fff"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {Lookup.map(category => Inv(category))}
      </Tabs>
    </aside>
  );
};

export { InventoriesBlock };
export default InventoriesBlock;
