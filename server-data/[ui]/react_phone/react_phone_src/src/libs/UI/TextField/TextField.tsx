/* eslint-disable react-hooks/rules-of-hooks */
// core
import React, { useState, useRef, useEffect } from 'react';
import Inputmask from 'inputmask';
// ui
import Control from '../Control/Control';
// style
import './TextField.scss';

interface IProps extends React.ComponentPropsWithoutRef<'input'> {
  fullWidth?: boolean;
  variant?: string;
  mask?: string;
  maskOptions?: { placeholder: string };
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  label?: string;
  value?: string;
  focus?: IFocusData;
}

function TextField(props: IProps): JSX.Element {
  const {
    children,
    variant = 'flat',
    fullWidth,
    readOnly,
    maxLength,
    label,
    value,
    onChange,
    onFocus,
    onBlur,
    inputRef,
    placeholder,
    mask,
    maskOptions,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);

  const inputRefInner = inputRef || useRef<HTMLInputElement>();

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

  useEffect(() => {
    if (mask) Inputmask({ mask: mask, ...maskOptions }).mask(inputRefInner.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Control
      className={$(fieldClassName, readOnly ? 'readonly' : null, fullWidth ? 'fullwidth' : null)}
      onFocus={handleWrapperFocus}
      {...rest}
    >
      <label className={`${fieldClassName}__label`} data-shrink="false" htmlFor="standard-basic">
        {label}
      </label>
      <div className={`${fieldClassName}__control`}>
        <input
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid="false"
          id="standard-basic"
          type="text"
          className={`${fieldClassName}__input`}
          value={value}
          readOnly={readOnly}
          maxLength={maxLength}
          ref={inputRefInner}
          placeholder={placeholder}
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
