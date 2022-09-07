import React from 'react';
import { observer } from 'mobx-react';
// styles
import API from 'API';
import s from './index.local.scss';
// store
import Store from '~m/ClothesShop/Storage';
import { ClothesShopGrid } from '../components';
import { PayForm } from '~cmp/PayForm';

const View = observer(({ category }: { category: string }): JSX.Element => {
  const buyClick = account => {
    API.query('shop/buy', {
      cart: Store.cart,
      account,
    });
  };

  return (
    <div className={s.Wrapper}>
      <div className={s.Column}>
        <p className={s.Heading}>{category}</p>
        <ClothesShopGrid
          active={Store.findInCart}
          items={Store.ShopItems()}
          onClick={Store.addToCart}
        />
      </div>
      <PayForm total={-1456} buyClick={buyClick} />
      <div className={s.Column}>
        <p className={s.Heading}>{category}: варианты</p>
        <ClothesShopGrid
          active={Store.findItemVariation}
          items={Store.getItemColors()}
          onClick={Store.setVariation}
        />
      </div>
    </div>
  );
});

export { View };
export default View;
