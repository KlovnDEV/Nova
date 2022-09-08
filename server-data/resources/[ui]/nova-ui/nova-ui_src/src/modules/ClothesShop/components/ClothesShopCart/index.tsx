import React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonGroup, Icon } from 'libs/UI';
import ShopStore from 'modules/ClothesShop/Storage';
import API from 'API';
import axios from 'axios';
import s from './index.local.scss';

const ClothesShopCart = observer((): JSX.Element => {
  const { format } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const buyClick = account => {
    axios.post(`http://nova-ui/buy`, {
      cart: ShopStore.cart,
      account,
    });
    // API.query('clothesshop/buy', {
    //   cart: ShopStore.cart,
    //   account,
    // });
  };

  return (
    <div className={s.ShopCartInfo}>
      <div className={s.ShopCartInfoGroup}>
        <p className={s.ShopCartInfoHeader}>Способ оплаты</p>
        <ButtonGroup className={s.ShopCartInfoButtonGroup}>
          <Button className={s.ShopCartInfoButton} variant="rect" onClick={() => buyClick('bank')}>
            <Icon className={s.ShopCartInfoButtonIcon} name="icon-credit" />
            Карта
          </Button>
          <Button className={s.ShopCartInfoButton} variant="rect" onClick={() => buyClick('cash')}>
            <Icon className={s.ShopCartInfoButtonIcon} name="icon-wallet" />
            Наличные
          </Button>
        </ButtonGroup>
        <div className={s.ShopCartInfoMoney}>
          {/* <p>{format(ShopStore.Money.bank)}</p>
          <p>{format(ShopStore.Money.cash)}</p> */}
          <p>{format(1000)}</p>
          <p>{format(150000)}</p>
        </div>
      </div>
      <div className={s.ShopCartInfoGroup}>
        <p className={s.ShopCartInfoHeader}>Итого</p>
        {/* <p className={s.ShopCartInfoTotal}>{format(ShopStore.totalPrice)}</p> */}
        <p className={s.ShopCartInfoTotal}>{format(450)}</p>
      </div>
    </div>
  );
});

export { ClothesShopCart };
export default ClothesShopCart;
