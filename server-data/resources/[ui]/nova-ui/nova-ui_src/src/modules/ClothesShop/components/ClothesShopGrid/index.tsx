import React from 'react';
import { observer } from 'mobx-react';
// types
import { IShopItem } from 'modules/ClothesShop/types';
// store
import { ClothesShopItem } from '~m/ClothesShop/components/ClothesShopItem';
// styles
import s from './index.local.scss';

const ClothesShopGrid = observer(
  ({
    items,
    onClick,
    active,
  }: {
    items: IShopItem[];
    onClick: { (uid: string): void };
    active: { (uid: string): string };
  }): JSX.Element => (
    <main className={s.ShopGrid}>
      {items?.length > 0 &&
        items.map(({ price, uid, category }) => (
          <ClothesShopItem
            key={uid}
            price={price}
            uid={uid}
            category={category}
            inCart={!!active(uid)}
            onClick={onClick}
          />
        ))}
    </main>
  ),
);

export { ClothesShopGrid };
export default ClothesShopGrid;
