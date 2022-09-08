import React from 'react';
import { observer } from 'mobx-react';
import { Button, ButtonGroup, Icon, InputField } from 'libs/UI';
import ShopStore from 'modules/Shop/Storage';
import { IShopItem } from 'modules/Shop/types';
import API from 'API';
import s from './index.local.scss';
import { PayForm } from '~cmp/PayForm';

type IRowProps = {
  item: IShopItem;
  changeQuantity: {
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      item: IShopItem,
      quantity: number,
    ): void;
  };
  quantity: number;
  format: { (x: number): string };
};

const Row = observer(({ item, changeQuantity, quantity, format }: IRowProps) => {
  return (
    <div key={item.uid} className={s.CartItem}>
      <button type="button" onClick={() => ShopStore.addToCart(item.uid)} className={s.CartDelete}>
        <Icon name="close-cross" fill="#f00" />
      </button>
      <div className={s.CartItemInfo}>
        <div className={s.CartItemImage}>
          <Icon name={[item.name, 'unknown']} />
        </div>
        <p className={s.CartItemText}>{item.displayName}</p>
      </div>
      <p className={s.CartItemText}>{item.owner}</p>
      <div className={s.CartItemCount}>
        <InputField
          className={s.CartItemQuantity}
          type="number"
          name={`${item.uid}-quantity`}
          value={item.quantity}
          onChange={e => changeQuantity(e, item, quantity)}
        />
        <p className={s.CartItemText}>&nbsp;/&nbsp;{quantity}</p>
      </div>
      <p className={s.CartItemText}>{format(item.price)}</p>
      <p className={s.CartItemText}>{format(item.quantity * item.price)}</p>
    </div>
  );
});

const ShopCart = observer((): JSX.Element => {
  const { format } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const changeQuantity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    item: IShopItem,
    quantity: number,
  ) => {
    const {
      target: { value: val },
    } = e;
    let value = parseInt(val, 10);
    if (value > quantity) value = quantity;
    if (value < 1 || !value) value = 1;
    // eslint-disable-next-line no-param-reassign
    item.quantity = value;
  };

  const buyClick = (account: 'bank' | 'cash') => {
    API.query('shop/buy', {
      cart: ShopStore.Cart,
      account,
    });
  };

  return (
    <main className={s.ShopCart}>
      <div className={s.ShopCartHeader}>
        <div className={s.CartItem}>
          <div />
          <p className={s.CartItemDescr}>Наименование</p>
          <p className={s.CartItemDescr}>Продавец</p>
          <p className={s.CartItemDescr}>Количество</p>
          <p className={s.CartItemDescr}>Стоимость/шт.</p>
          <p className={s.CartItemDescr}>Общая стоимость</p>
        </div>
      </div>
      <div className={s.ShopCartGrid}>
        {ShopStore.Cart.map(item => {
          const { quantity } = ShopStore.Items.find(elem => elem.uid === item.uid);
          return (
            <Row
              key={item.uid}
              item={item}
              format={format}
              changeQuantity={changeQuantity}
              quantity={quantity}
            />
          );
        })}
      </div>
      <PayForm total={ShopStore.totalPrice} buyClick={buyClick} />
      {/* <div className={s.ShopCartInfo}>
        <div className={s.ShopCartInfoGroup}>
          <p className={s.ShopCartInfoHeader}>Способ оплаты</p>
          <ButtonGroup className={s.ShopCartInfoButtonGroup}>
            <Button
              className={s.ShopCartInfoButton}
              variant="rect"
              onClick={() => buyClick('bank')}
            >
              <Icon className={s.ShopCartInfoButtonIcon} name="icon-credit" />
              Карта
            </Button>
            <Button
              className={s.ShopCartInfoButton}
              variant="rect"
              onClick={() => buyClick('cash')}
            >
              <Icon className={s.ShopCartInfoButtonIcon} name="icon-wallet" />
              Наличные
            </Button>
          </ButtonGroup>
          <div className={s.ShopCartInfoMoney}>
            <p>{format(ShopStore.Money.bank)}</p>
            <p>{format(ShopStore.Money.cash)}</p>
          </div>
        </div>
        <div className={s.ShopCartInfoGroup}>
          <p className={s.ShopCartInfoHeader}>Итого</p>
          <p className={s.ShopCartInfoTotal}>{format(ShopStore.totalPrice)}</p>
        </div>
      </div> */}
    </main>
  );
});

export { ShopCart };
export default ShopCart;
