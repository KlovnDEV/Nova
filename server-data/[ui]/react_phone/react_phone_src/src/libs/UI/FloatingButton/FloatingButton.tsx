// core
import React from 'react';
// ui
import Control, { IProps } from '../Control/Control';
// style
import './FloatingButton.scss';

function FloatingButton(props: IProps): JSX.Element {
  const { children, color, className, ...rest } = props;

  return (
    <Control elevation={6} className={$('floating-button__wrapper', className || null)} {...rest}>
      <div className="floating-button__button" style={{ backgroundColor: color || undefined }}>
        {children}
      </div>
    </Control>
  );
}

export default FloatingButton;
