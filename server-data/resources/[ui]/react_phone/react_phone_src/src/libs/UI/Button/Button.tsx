// core
import React from 'react';
// components
// ui
import Control, { IProps as ControlProps } from '../Control/Control';
// styles
import './Button.scss';

interface IProps extends ControlProps {
  description?: string;
  width?: string | number;
  height?: string | number;
  round?: boolean;
}

function Button(props: IProps): JSX.Element {
  const {
    onClick,
    children,
    description,
    width,
    height,
    round,
    color,
    elevation,
    className,
    ...rest
  } = props;

  const styles = () => {
    return {
      width: width,
      height: height,
      borderRadius: round ? '50%' : undefined,
      backgroundColor: color,
    };
  };

  return (
    <Control ripple onClick={onClick} className={$('button-wrapper', className || null)} {...rest}>
      <div className={$('button', elevation ? `elevation-${elevation}` : null)} style={styles()}>
        {children}
        {description && <div className="button-description">{description}</div>}
      </div>
    </Control>
  );
}

export default Button;
