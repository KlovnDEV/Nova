// core
import React, { useState, useEffect, useRef } from 'react';
import Inputmask from 'inputmask';
// UI
import Control from '../Control/Control';
import SvgIcon from '../SvgIcon/SvgIcon';
import TextField from '../TextField/TextField';

// style
import './ValidatedTextField.scss';

/*
  @deprecated
*/

interface IProps extends React.ComponentPropsWithoutRef<'input'> {
  fullWidth?: boolean;
  mask?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onValidate: { (value: string): boolean };
  onApply?: { (value: string): void };
  onCancel?: { (prevValue: string): void };
  value: string;
}

function ValidatedTextField(props: IProps): JSX.Element {
  const {
    children,
    style,
    className,
    fullWidth,
    mask,
    value,
    onValidate,
    onApply,
    onCancel,
    ...rest
  } = props;
  let inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (mask) {
      const maskObj = new Inputmask(mask);
      if (inputRef.current) {
        maskObj.mask(inputRef.current);
      }
    }
  }, [mask]);

  const [prevValue, setPrevValue] = useState(value);
  const [innerValue, setInnerValue] = useState(value);
  const [isReadOnly, setReadOnly] = useState(true);
  const [isValid, setValid] = useState(true);

  // eslint-disable-next-line react/destructuring-assignment
  if (props.inputRef) {
    // FIXME
    inputRef = (inputRef as any)(props.inputRef);
  }

  const acceptButton = () => {
    return (
      isValid && (
        <button
          type="button"
          className="validated-text-field__button"
          onClick={e => {
            e.preventDefault();
            setReadOnly(true);
            setPrevValue(innerValue);
            if (onApply) onApply(innerValue);
          }}
        >
          <SvgIcon
            className="validated-text-field__accept"
            width={32}
            height={32}
            src="CheckOutlined"
          />
        </button>
      )
    );
  };

  const cancelButton = () => {
    return (
      <button
        type="button"
        className="validated-text-field__button"
        onClick={e => {
          e.preventDefault();
          setInnerValue(prevValue);
          setReadOnly(true);
          if (onCancel) onCancel(prevValue);
        }}
      >
        <SvgIcon
          className="validated-text-field__cancel"
          width={32}
          height={32}
          src="CancelOutlined"
        />
      </button>
    );
  };

  const editButton = () => {
    return (
      <button
        type="button"
        className="validated-text-field__button"
        onClick={e => {
          e.preventDefault();
          setReadOnly(false);
          if (inputRef && inputRef.current) inputRef.current.focus();
        }}
      >
        <SvgIcon className="validated-text-field__edit" width={32} height={32} src="Edit" />
      </button>
    );
  };

  return (
    <Control
      className={$(
        'validated-text-field',
        'position-flex-between',
        className,
        fullWidth ? 'fullwidth' : null,
        isReadOnly ? 'readonly' : null,
      )}
      style={style}
    >
      <TextField
        {...rest}
        fullWidth={fullWidth}
        readOnly={isReadOnly}
        onChange={e => {
          setInnerValue(e.target.value);
          setValid(onValidate(e.target.value));
        }}
        value={innerValue}
        inputRef={inputRef}
      />
      {!isReadOnly && (
        <>
          {acceptButton()}
          {cancelButton()}
        </>
      )}
      {isReadOnly && <>{editButton()}</>}
    </Control>
  );
}

export default ValidatedTextField;
