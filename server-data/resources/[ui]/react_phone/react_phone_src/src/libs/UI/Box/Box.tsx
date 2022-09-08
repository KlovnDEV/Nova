// core
import React from 'react';
// style
import './Box.scss';

interface IProps extends React.ComponentPropsWithoutRef<'div'> {
  elevation?: number;
  flex?: string;
  className?: string;
}

const Box = React.forwardRef<HTMLDivElement, IProps>(function BoxInner(props, ref) {
  const { children, className = '', flex = '', elevation = 0, ...rest } = props;

  const generateClasses = () => {
    const classes = [];
    classes.push(className);
    if (flex) {
      const flexParams = flex.split(' ');
      if (!flexParams.includes('column') && !flexParams.includes('row')) flexParams.unshift('row');
      flexParams.map(f => classes.push(`position-flex-${f}`));
    }

    if (elevation) classes.push(`elevation-${elevation}`);
    return classes.join(' ');
  };

  return (
    <div ref={ref} className={generateClasses()} {...rest}>
      {children}
    </div>
  );
});

export { IProps };

export default Box;
