/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo } from 'react';
import classNames from 'classnames/bind';
// components
import { Icon } from 'libs/UI/Icon';
import s from './index.local.scss';
import { UIRange } from '../@types';

const RangeProto = ({
  name,
  displayName,
  value,
  min,
  max,
  step,
  className,
  onChange,
  onIncrease,
  onDecrease,
  slotCounter,
}: UIRange): JSX.Element => (
  <div className={classNames(s.Wrapper, className)}>
    <span className={s.Label}>
      {displayName || name}
      {slotCounter && <span className={s.SlotCounter}>{slotCounter}</span>}
    </span>
    <label htmlFor={name} className={s.ArrowWrapper} onClick={onDecrease}>
      <Icon className={s.Arrow} name="arrow" />
    </label>
    <label className={s.ArrowWrapper} onClick={onIncrease} htmlFor={name}>
      <Icon className={s.Arrow} name="arrow-rotated" />
    </label>
    <input
      className={s.Input}
      type="range"
      id={name}
      name={name}
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
    />
    <span className={s.Backdrop}>&nbsp;</span>
  </div>
);

const Range = memo(RangeProto);

export { Range };
export default Range;
