// core
import React from 'react';
import * as T from './Box.d';
// style
import p from './Box.module.scss';
import e from '../Utils/Elevation.module.scss';

const Box = (props: T.Props, ref: React.Ref<HTMLDivElement>) => {
  const { children, className, flex, elevation, ...rest } = props;

  const generateClasses = () => {
    const classes = [];
    classes.push(className);
    if (flex) {
      const flexParams = flex.split(' ');
      if (!flexParams.includes('column') && !flexParams.includes('row')) flexParams.unshift('row');
      flexParams.map((f: string) => classes.push(p[`position-flex-${f}`]));
    }

    if (elevation) classes.push(e[`elevation-${elevation}`]);
    return classes.join(' ');
  };

  return (
    <>
      <div ref={ref} className={generateClasses()} {...rest}>
        {children}
      </div>
    </>
  );
};

export default React.forwardRef<HTMLDivElement, T.Props>(Box);
