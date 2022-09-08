import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
// utils
import { imgReader } from 'utils/fileReaders';
import API from 'API';
import { Redirect, Route, Switch, useHistory, useLocation, useParams } from 'react-router-dom';
import { ShopLink, ShopPage, ShopCart, ShopWarehouse } from './Components';
// store
import ShopStore from './Storage';
// styles
import s from './index.local.scss';

const ShopImgs = imgReader(require.context(`${ASSETS}/img/shops`, false, /^assets.*\.(png)$/));

const Shop = observer((): JSX.Element => {
  const location = useLocation();
  const history = useHistory();

  const changeCategoryHandler = (category: string) => {
    history.push(`/shop/${category}`);
  };

  const closeShop = () => {
    API.query('shop/close', {});
  };

  if (!ShopStore.Menu) return null;

  return (
    <div className={s.Wrapper}>
      <div className={s.Shop}>
        <aside className={s.ShopNav}>
          <div className={s.ShopLogoWrapper}>
            <img className={s.ShopLogo} src={ShopImgs[0].originalPath} alt="" />
          </div>
          <div className={s.separator} />
          <nav className={s.ShopMenu}>
            <ShopLink
              name="Все"
              category={null}
              isActive={location.pathname === '/shop/all'}
              action={() => changeCategoryHandler('all')}
            />
            {ShopStore.Menu.map(({ name, category }) => (
              <ShopLink
                key={category}
                name={name}
                category={category}
                isActive={location.pathname === `/shop/${category}`}
                action={() => changeCategoryHandler(category)}
              />
            ))}
          </nav>
          <div className={s.separator} />
          <div className={classNames(s.ShopMenu, s.ShopMenuControls)}>
            <ShopLink
              name="Склад"
              category="warehouse"
              isActive={location.pathname === '/shop/warehouse'}
              action={() => changeCategoryHandler('warehouse')}
            />
            <div className={s.CartWrapper}>
              <ShopLink
                name="Корзина"
                category="cart"
                isActive={location.pathname === '/shop/cart'}
                action={() => changeCategoryHandler('cart')}
              />
              <span style={{ opacity: ShopStore.Cart.length > 0 ? 1 : 0 }} className={s.CartIcon}>
                {ShopStore.Cart.length}
              </span>
            </div>
            <ShopLink name="Уйти" category="cart" isActive={false} action={closeShop} />
          </div>
        </aside>
        <Switch>
          <Route exact path="/shop/" render={() => <Redirect to="/shop/all" />} />
          <Route exact path="/shop/cart">
            <ShopCart />
          </Route>
          <Route exact path="/shop/warehouse">
            <ShopWarehouse />
          </Route>
          <Route
            path="/shop/:category?"
            render={({
              match: {
                params: { category },
              },
            }) => <ShopPage category={category} />}
          />
        </Switch>
      </div>
    </div>
  );
});

export { Shop };
export default Shop;
