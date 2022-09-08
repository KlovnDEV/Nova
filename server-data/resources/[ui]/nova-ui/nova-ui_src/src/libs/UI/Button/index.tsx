import React from 'react';
import classNames from 'classnames/bind';
import { UIButton } from '../@types';
import s from './index.local.scss';

const Button = ({
  children,
  className,
  active,
  variant = 'rect',
  onFocus,
  onBlur,
  onClick,
  onKeyDown,
  onMouseOver,
  onMouseOut,
  onMouseEnter,
  onMouseLeave,
  innerRef,
  style,
  disabled = false,
}: UIButton): JSX.Element => (
  <button
    type="button"
    ref={innerRef}
    className={classNames(s.Button, s[variant], active && s['is-active'], className)}
    onFocus={onFocus}
    onBlur={onBlur}
    onClick={onClick}
    onKeyDown={onKeyDown}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={style}
    disabled={disabled}
  >
    <span className={s.Children}>{children}</span>
    <span className={s.Backdrop}>&nbsp;</span>
  </button>
);

export { Button };
export default Button;
