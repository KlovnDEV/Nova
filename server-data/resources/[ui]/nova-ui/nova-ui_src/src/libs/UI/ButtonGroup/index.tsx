import React from 'react';
import classNames from 'classnames/bind';
// styles
import s from './index.local.scss';
import { UIButtonGroup } from '../@types';

const ButtonGroup = ({ children, direction, className, style }: UIButtonGroup): JSX.Element => (
  <div
    style={{ ...style, gridAutoFlow: direction || 'column' }}
    className={classNames(s.ButtonGroup, className)}
  >
    {children}
  </div>
);

export { ButtonGroup };
export default ButtonGroup;
