// core
import React from 'react';
// ui
import Control from '../Control/Control';
// style
import s from './Select.module.scss';

function Select(props) {
  const { name, options, fullWidth, readOnly, value, onChange, id, defaultValue, ...rest } = props;

  return (
    <Control
      className={$(
        s.Wrapper,
        readOnly ? 'readonly' : null,
        fullWidth ? 'fullwidth' : null,
        !onChange ? 'readonly' : null,
      )}
      {...rest}
    >
      <select
        name={name}
        id={id}
        className={s.Native}
        onChange={onChange}
        value={value !== undefined ? value : defaultValue}
      >
        {options.map(option => (
          <option key={option.label} {...option}>
            {option.label}
          </option>
        ))}
      </select>
    </Control>
  );
}

export default Select;
