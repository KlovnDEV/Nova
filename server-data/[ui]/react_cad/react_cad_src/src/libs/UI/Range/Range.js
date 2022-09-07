// core
import React from 'react';
import { observer } from 'mobx-react';
// style
import style from './Range.module.scss';

function Range(props) {
  const { min, max, step, value, onChange, ...rest } = props;

  return (
    <input
      className={style.range}
      type="range"
      min={min || 0}
      max={max || 100}
      step={step || 1}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

export default observer(Range);
