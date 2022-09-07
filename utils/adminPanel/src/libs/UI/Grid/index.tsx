import React from 'react';
// types
import { UIGrid } from 'libs/UI/@types';
// styles
import s from './index.local.scss';

const Grid = ({
  children,
  cols = 5,
  itemSize = 64,
  gap = 2,
  justify = 'left',
}: UIGrid): JSX.Element => {
  const renderStyles = (): React.CSSProperties => {
    return {
      gridTemplateColumns: `repeat(${cols}, ${itemSize}px)`,
      gridAutoRows: `${itemSize}px`,
      gap: typeof gap === 'number' ? `${gap}px` : gap.map(item => `${item}px`).join(' '),
      justifyContent: justify,
    };
  };
  return (
    <div className={s.Wrapper} style={renderStyles()}>
      {children}
    </div>
  );
};

export { Grid };
export default Grid;
