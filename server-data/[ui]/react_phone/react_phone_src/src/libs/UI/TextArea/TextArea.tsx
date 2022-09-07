// core
import React from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
// ui
import Control from '../Control/Control';
// style
import './TextArea.scss';

type TParent = Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'>;
interface IProps extends TParent {
  fullWidth?: boolean;
  label?: string;
  inputRef?: React.Ref<HTMLTextAreaElement>;
  readOnly?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: TextareaAutosizeProps['onChange'];
}

function TextArea(props: IProps): JSX.Element {
  const {
    children,
    fullWidth,
    readOnly,
    maxLength,
    label,
    value,
    onChange,
    onFocus,
    onBlur,
    inputRef,
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
          maxRows={4}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid="false"
          className="text-area__input page__scrollbar"
          value={value}
          readOnly={readOnly}
          maxLength={maxLength}
          ref={inputRef}
        />
      </div>
    </Control>
  );
}

export default TextArea;
