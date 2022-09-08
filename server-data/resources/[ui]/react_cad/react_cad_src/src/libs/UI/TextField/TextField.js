// core
import React, { useState, useRef } from 'react';
// ui
import Control from '../Control/Control';
// style
import './TextField.scss';

function TextField(props) {
  const {
    children,
    variant,
    fullWidth,
    readOnly,
    maxLength,
    label,
    value,
    onChange,
    onFocus,
    onBlur,
    inputRef,
    id,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);

  const inputRefInner = inputRef || useRef();

  const handleWrapperFocus = () => {
    if (inputRefInner.current) {
      inputRefInner.current.focus();
    }
  };

  const handleFocus = e => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const fieldClassName = $(
    value === '' ? 'empty' : null,
    focused ? 'focused' : null,
    `text-field-${variant}`,
  );

  return (
    <Control
      className={$(fieldClassName, readOnly ? 'readonly' : null, fullWidth ? 'fullwidth' : null)}
      onFocus={handleWrapperFocus}
      {...rest}
    >
      <label className={`${fieldClassName}__label`} data-shrink="false" htmlFor={id}>
        {label}
      </label>
      <div className={`${fieldClassName}__control`}>
        <input
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid="false"
          id={id}
          type="text"
          className={`${fieldClassName}__input`}
          value={value}
          readOnly={readOnly ? 'readonly' : ''}
          maxLength={maxLength}
          ref={inputRefInner}
        />
        <fieldset className={`${fieldClassName}__outline`}>
          <legend>
            <span>{label}</span>
          </legend>
        </fieldset>
      </div>
    </Control>
  );
}

export default TextField;
