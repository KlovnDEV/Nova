import React from 'react';
import { observer } from 'mobx-react';
import { Icon } from 'libs/UI';
import { Droppable } from 'modules/Inventory/Components';
import AppStorage from 'modules/App/Storage';
import PlayerInfoStore from './Storage';
import { Skill } from './Components/Skill';
import s from './index.local.scss';

const PlayerInfo = observer((): JSX.Element => {
  const onDrop = (item: any, pos: { x: number; y: number }, slot: any): void => {
    const ind = PlayerInfoStore.slots.findIndex(sl => sl.id === slot.id);
    if (ind >= 0) PlayerInfoStore.slots[ind].item = item;
  };

  const slotClickHandler = (e: React.MouseEvent<HTMLButtonElement>, slot) => {
    if (e.shiftKey || e.ctrlKey) {
      const ind = PlayerInfoStore.slots.findIndex(sl => sl.id === slot.id);
      if (ind >= 0) PlayerInfoStore.slots[ind].item = undefined;
    }
  };

  const quickSlots = PlayerInfoStore.slots.map(slot => (
    <Droppable key={slot.id} accept="inv-item" onDrop={(item, pos) => onDrop(item, pos, slot)}>
      <button type="button" className={s.QuickSlot} onClick={e => slotClickHandler(e, slot)}>
        {slot.item && <Icon name={slot.item.name} />}
        <span className={s.QuickSlotText}>{slot.id}</span>
      </button>
    </Droppable>
  ));

  return (
    <div
      className={s.PlayerInfo}
      style={{
        opacity: AppStorage.isPlayerInfoVisible ? 1 : 0,
        pointerEvents: AppStorage.isPlayerInfoVisible ? 'all' : 'none',
      }}
    >
      <div className={s.PlayerInfoFilter} />
      <div className={s.TopBar}>
        <div className={s.Quick}>{quickSlots}</div>
        <div className={s.TopInfo}>
          <span className={s.Tel}>{PlayerInfoStore.phone}</span>
          <p className={s.TopInfoRow}>
            <span>${PlayerInfoStore.bank}</span>
            <Icon className={s.CashIcon} name="icon-credit" />
          </p>
          <p className={s.TopInfoRow}>
            <span>${PlayerInfoStore.cash}</span>
            <Icon className={s.CashIcon} name="icon-wallet" />
          </p>
          <div className={s.Skills}>
            {PlayerInfoStore.skills.map(sk => (
              <Skill label={sk.label} value={sk.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export { PlayerInfo };
export default PlayerInfo;
