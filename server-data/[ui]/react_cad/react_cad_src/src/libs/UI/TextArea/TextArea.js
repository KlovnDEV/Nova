// core
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
// ui
import Control from '../Control/Control';
// style
import './TextArea.scss';

function TextArea(props) {
  const {
    readOnly,
    maxLength,
    value,
    onChange,
    onFocus,
    onBlur,
    inputRef,
    maxRows,
    ...rest
  } = props;

  const handleFocus = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  return (
    <Control className={$('text-area', readOnly ? 'readonly' : '')} {...rest}>
      <div className="text-area__control">
        <TextareaAutosize
          maxRows={maxRows || 4}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid="false"
          type="text"
          className="text-area__input page__scrollbar"
          value={value}
          readOnly={readOnly ? 'readonly' : ''}
          maxLength={maxLength}
          ref={inputRef}
        />
      </div>
    </Control>
  );
}

export default TextArea;
