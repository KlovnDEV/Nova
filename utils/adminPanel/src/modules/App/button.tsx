import React, { CSSProperties, ReactNode, MouseEventHandler } from 'react';

type ButtonProps = {
  className?: string;
  children?: ReactNode;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, disabled, children } = props;

  const render = (styles: any): JSX.Element => {
    return (
      <button style={styles} type="button" disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  };

  const bgColor = 'green';

  return render({
    color: '#fff',
    background: '#007acc',
  });
};

export default Button;

/*
  return render({
    display: 'inline-block',
    padding: '0px 15px',
    background: 'linear-gradient(left, rgba(150, 150, 150, 0.5) 0%, rgba(255, 255, 255, 0.25) 20%)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '7px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 400,
    height: 20,
    lineHeight: '18px',
    margin: '0px 15px',
    minWidth: '0px',
    opacity: 0.8,
    outline: 'none',
    paddingTop: '2',
  }); */

/* ---------------- CONTEXT
"""
import React, { CSSProperties, ReactNode, MouseEventHandler } from 'react';

type ButtonProps = {
  className?: string;
  children?: ReactNode;
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = (props: ButtonProps): JSX.Element => {
  const { onClick, disabled, children } = props;

  const render = (styles: CSSProperties): JSX.Element => {
    return (
      <button style={styles} type="button" disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  };

  // Stylish light rounded button with gradient background
  return render({
"""
*/
