import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { Icon } from 'libs/UI';
import { IShopLink } from 'modules/Shop/types';
import s from './index.local.scss';

const ShopLink = memo(({ category, name, isActive, action, icon }: IShopLink): JSX.Element => {
  return (
    <button
      className={classNames(s.Link, isActive ? s['is-active'] : null)}
      type="button"
      onClick={() => action(category)}
    >
      <span className={s.LinkIconWrapper}>
        <Icon fill="#ccc" className={s.LinkIcon} name={[icon, 'unknown']} />
      </span>
      <span className={s.LinkText}>{name}</span>
    </button>
  );
});

export { ShopLink };
export default ShopLink;
