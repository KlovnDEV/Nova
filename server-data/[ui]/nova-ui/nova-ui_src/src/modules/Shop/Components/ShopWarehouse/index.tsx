import React, { ChangeEvent, ChangeEventHandler, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Icon, InputField } from 'libs/UI';
import ShopStore from 'modules/Shop/Storage';
import { IShopItem } from 'modules/Shop/types';
import API from 'API';
import s from './index.local.scss';

type IRowProps = {
  item: IShopItem;
  changePrice: {
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, item: IShopItem): void;
  };

  changeHandler: { (uid: string, stored: boolean): void };
};

const Row = observer(({ item, changePrice, changeHandler }: IRowProps) => {
  const onRowBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1 || !value) {
      // eslint-disable-next-line no-param-reassign
      item.price = 1;
    }
  };

  return (
    <div key={item.uid} className={s.CartItem}>
      <div className={s.CartItemInfo}>
        <div className={s.CartItemImage}>
          <Icon name={[item.name, 'unknown']} />
        </div>
        <p className={s.CartItemText}>{item.displayName}</p>
      </div>
      <div className={s.CartItemCount}>
        <p className={s.CartItemText}>{item.quantity}</p>
      </div>
      <div className={s.CartItemCount}>
        <InputField
          className={s.CartItemPrice}
          type="number"
          name={`${item.uid}-price`}
          value={item.price}
          onChange={e => changePrice(e, item)}
          onBlur={onRowBlur}
        />
      </div>

      <p className={s.CartItemText}>
        <label htmlFor={item.uid as string}>
          <input
            type="checkbox"
            name={item.uid as string}
            id={item.uid as string}
            checked={ShopStore.storedItems[item.uid]}
            onChange={() => changeHandler(item.uid as string, !ShopStore.storedItems[item.uid])}
          />
        </label>
      </p>
    </div>
  );
});

const ShopWarehouse = observer((): JSX.Element => {
  const changePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: IShopItem,
  ) => {
    const {
      target: { value: val },
    } = e;
    const value = parseInt(val, 10);
    if (value < 1 || !value) {
      // eslint-disable-next-line no-param-reassign
      item.price = 1;
    }
    // eslint-disable-next-line no-param-reassign
    item.price = value;
  };

  const applyClick = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [k, isStored] of Object.entries(ShopStore.storedItems)) {
      const wareItem = ShopStore.Warehouse.find(item => item.uid == k);
      const shopItem = ShopStore.Items.find(item => item.uid == k);

      if (wareItem) {
        wareItem.stored = isStored;
      } else if (shopItem) {
        shopItem.stored = isStored;
      }
    }

    API.query('shop/warehouse/change', {
      shopId: ShopStore.shopId,
      warehouse: ShopStore.Warehouse,
      items: ShopStore.Items,
    });
  };

  useEffect(() => {
    return () => {
      ShopStore.resetStored();
    };
  }, []);

  return (
    <main className={s.ShopCart}>
      <div className={s.ShopCartHeader}>
        <div className={s.CartItem}>
          <p className={s.CartItemDescr}>Наименование</p>
          <p className={s.CartItemDescr}>Количество</p>
          <p className={s.CartItemDescr}>Стоимость/шт.</p>
          <p className={s.CartItemDescr}>На складе</p>
        </div>
      </div>
      <div className={s.ShopCartGrid}>
        {ShopStore.AllItems.map(item => {
          // const { quantity, price } = ShopStore.AllItems.find(elem => elem.uid === item.uid);
          return (
            <Row
              key={item.uid}
              item={item}
              changePrice={changePrice}
              changeHandler={ShopStore.setToStore}
            />
          );
        })}
      </div>
      <div className={s.ShopCartInfo}>
        <div />
        <div className={s.ShopCartInfoGroup}>
          <Button className={s.ShopCartInfoButton} variant="rect" onClick={() => applyClick()}>
            <Icon className={s.ShopCartInfoButtonIcon} name="check" />
            Применить
          </Button>
        </div>
      </div>
    </main>
  );
});

export { ShopWarehouse };
export default ShopWarehouse;
