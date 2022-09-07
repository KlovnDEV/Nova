// core
import React from 'react';
// ui
import Box, { IProps as BoxProps } from '../Box/Box';
// style
import './Control.scss';

interface IProps extends BoxProps {
  className?: string;
  tabIndex?: number;
  ripple?: boolean;
  focus?: IFocusData;
}

const Control = React.forwardRef<HTMLDivElement, IProps>(function ControlInner(props, ref) {
  const { children, className, tabIndex = 0, ripple = false, focus = undefined, ...rest } = props;

  return (
    <Box
      ref={ref}
      className={$('control', className, ripple ? 'control_ripple' : null)}
      tabIndex={tabIndex}
      data-focus-name={focus?.name}
      data-focus-left={focus?.left}
      data-focus-right={focus?.right}
      data-focus-up={focus?.up}
      data-focus-down={focus?.down}
      data-focus-enter={focus?.enter}
      {...rest}
    >
      {children}
    </Box>
  );
});

export { IProps };

export default Control;
