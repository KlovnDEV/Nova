import React, { memo } from 'react';
import classNames from 'classnames';
import { Icon } from 'libs/UI';
import { IShopItem } from 'modules/Shop/types';
import s from './index.local.scss';

type T = {
  inCart: boolean;
  onClick: { (x: string | number): void };
};

type ShopItemCard = T & IShopItem;

const ShopItem = memo(
  ({
    name,
    owner,
    quantity,
    price,
    displayName,
    inCart,
    uid,
    onClick,
  }: ShopItemCard): JSX.Element => {
    const { format } = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return (
      <div
        role="presentation"
        onClick={e => {
          e.preventDefault();
          onClick(uid);
        }}
        className={classNames(s.Item, inCart ? s['is-active'] : null)}
      >
        <div className={s.ItemInfoWrapper}>
          <Icon className={s.ItemIcon} name={name} />
          <div className={s.ItemInfo}>
            <h4 className={s.ItemInfoHeader}>Продавец</h4>
            <p className={s.ItemInfoDetail}>{owner}</p>
            <h4 className={s.ItemInfoHeader}>В наличии</h4>
            <p className={s.ItemInfoDetail}>{quantity} шт.</p>
            <Icon className={s.ItemInfoCartIcon} name="shopcart-add" />
          </div>
        </div>
        <p className={s.ItemPrice}>{format(price)}</p>
        <p className={s.ItemDescr}>{displayName}</p>
      </div>
    );
  },
);

export { ShopItem };
export default ShopItem;
