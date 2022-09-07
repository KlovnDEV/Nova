// core
import React from 'react';
// ui
import Box from '../Box/Box';
// types
import * as T from './Control.d';
// style
import s from './Control.module.scss';

const Control = (props: T.IProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, className, tabIndex, ripple, focus, ...rest } = props;

  return (
    <Box
      ref={ref}
      className={$(s.control, className, ripple ? s.control_ripple : null)}
      tabIndex={tabIndex || 0}
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
};

export default React.forwardRef<HTMLDivElement, T.IProps>(Control);
