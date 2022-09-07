import React from 'react';
import classNames from 'classnames';
import { Icon } from 'libs/UI';
import { IShopItem } from 'modules/ClothesShop/types';
import { observer } from 'mobx-react';
import s from './index.local.scss';
import Store from '~m/ClothesShop/Storage';

type T = {
  inCart: boolean;
  onClick: { (x: string): void };
};

type ShopItemCard = T & IShopItem;

const ClothesShopItem = observer(({ price, inCart, uid, onClick }: ShopItemCard): JSX.Element => {
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
        <img className={s.ItemIcon} src={Store.getItemImage(uid)} alt="" />
        <div className={s.ItemInfo}>
          <h4 className={s.ItemInfoHeader}>Цена</h4>
          <p className={s.ItemInfoDetail}>{format(price)}</p>
          <Icon className={s.ItemInfoCartIcon} name="shopcart-add" />
        </div>
      </div>
    </div>
  );
});

export { ClothesShopItem };
export default ClothesShopItem;
