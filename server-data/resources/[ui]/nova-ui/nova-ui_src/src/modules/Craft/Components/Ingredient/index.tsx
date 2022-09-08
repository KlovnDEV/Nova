import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
// components
import { Icon } from 'libs/UI';
// styles
import s from './index.local.scss';

type IProps = {
  amountRequired: number;
  amountAvailable: number;
  label: string;
  icon: string;
};

const Ingredient = observer(
  ({ amountAvailable, amountRequired = 0, label, icon }: IProps): JSX.Element => (
    <div
      className={classNames(s.Wrapper, amountAvailable >= amountRequired ? s['is-active'] : null)}
    >
      <div className={classNames(s.IconWrapper)}>
        <Icon name={[icon, 'unknown']} className={s.Icon} />
      </div>
      <p className={s.Label}>{label || icon}</p>
      <span className={s.Counter}>
        {amountAvailable} / {amountRequired}
      </span>
    </div>
  ),
);
export { Ingredient };
export default Ingredient;
