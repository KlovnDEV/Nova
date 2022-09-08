// core
import React from 'react';
// ui
import Control, { IProps as ControlProps } from '../Control/Control';
// style
import './Drawer.scss';

interface IProps extends ControlProps {
  isExpanded: boolean;
  position?: 'top' | 'bottom';
}

function Drawer(props: IProps): JSX.Element {
  const { children, isExpanded, position, elevation, ...rest } = props;
  return (
    <Control
      elevation={isExpanded ? elevation || 4 : null}
      className={$(`drawer-${position}`, isExpanded ? `is-expanded` : null)}
      {...rest}
    >
      {children}
    </Control>
  );
}

export default Drawer;
