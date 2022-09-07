import React, { memo } from 'react';
import classNames from 'classnames/bind';
// styles
import s from './index.local.scss';
// types
import { IGridItem } from '~m/Skinchanger/types';

const Item = ({
  children,
  name,
  value,
  onClick,
  active,
  variant = 'rect',
  className,
}: IGridItem): JSX.Element => (
  <label
    className={classNames(s.Item, active ? s['is-active'] : null, s[variant], className)}
    htmlFor={`${name}-${value}`}
  >
    <input
      className={s.Input}
      type="radio"
      id={`${name}-${value}`}
      name={name}
      value={value}
      onClick={onClick}
    />
    <span className={s.Children}>{children}</span>
    <span className={s.Backdrop} />
  </label>
);

const GridItem = memo(Item, (p, n) => p.active === n.active);

export { GridItem };
export default GridItem;
