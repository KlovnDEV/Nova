/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import s from './index.local.scss';
import { UIInputField } from '../@types';

const InputField = ({
  name,
  type = 'text',
  placeholder = '',
  value,
  className,
  labelText,
  onChange,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  onFocus,
  onBlur,
  multiline,
  textareaRef,
}: UIInputField): JSX.Element => {
  if (!textareaRef) textareaRef = useRef();

  const [textareaH, setTextareaH] = useState(0);

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaH(textareaRef.current.getBoundingClientRect().height);
    }
  }, [textareaRef]);

  return (
    <label className={classNames(s.Wrapper, className)} htmlFor={name}>
      {labelText && <span className={s.Label}>{labelText}</span>}
      {multiline ? (
        <textarea
          className={s.Input}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          ref={textareaRef}
          onChange={e => {
            if (textareaRef.current) {
              if (textareaRef.current.value === '' || textareaRef.current.value === ' ') {
                textareaRef.current.style.height = `${textareaH}px`;
              } else {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
              }
            }
            if (onChange) onChange(e);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          rows={1}
        />
      ) : (
        <input
          className={s.Input}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
        />
      )}
      <span className={s.Backdrop}>&nbsp;</span>
    </label>
  );
};

export { InputField };
export default InputField;
