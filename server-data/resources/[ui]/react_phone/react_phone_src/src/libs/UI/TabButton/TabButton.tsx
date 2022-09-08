// core
import React from 'react';
// ui
import Control, { IProps as ControlProps } from '../Control/Control';
// style
import './TabButton.scss';

interface IProps extends ControlProps {
  label: React.ReactNode;
  selected: boolean;
  onClick: React.ComponentProps<'div'>['onClick'];
}

const TabButton = React.forwardRef<HTMLDivElement, IProps>(function TabButtonInner(props, ref) {
  const { label, selected, onClick, ...rest } = props;

  return (
    <Control
      ref={ref}
      className={$('tab-button', selected ? 'tab-button_selected' : '')}
      onClick={onClick}
      {...rest}
    >
      <div className="tab-button__label">{label}</div>
    </Control>
  );
});

export default TabButton;
