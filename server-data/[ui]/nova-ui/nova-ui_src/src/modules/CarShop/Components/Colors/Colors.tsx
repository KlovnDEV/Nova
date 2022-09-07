import React from 'react';
import { observer } from 'mobx-react';
// components
import { Grid, Icon } from 'libs/UI';
import { GridItem } from 'components/GridItem';
// styles
import s from './Colors.local.scss';

type IProps = {
  anchor: string;
  items: AnyObject;
  cols?: number;
  itemSize?: number;
  justify?: 'left' | 'center' | 'right';
  gap?: number | [number, number];
  noRemove?: boolean;
  resetHandler?: any;
  setHandler?: any;
};

const Colors = observer(
  ({
    anchor,
    items,
    cols = 10,
    itemSize = 20,
    justify = 'left',
    gap = 8,
    noRemove = false,
    resetHandler,
    setHandler,
  }: IProps): JSX.Element => (
    <Grid key={anchor} cols={cols} itemSize={itemSize} gap={gap} justify={justify}>
      {!noRemove && (
        <GridItem
          onClick={resetHandler}
          value={-1}
          name={anchor}
          variant="circle"
          className={s.Close}
        >
          <span className={s.Item} style={{ backgroundColor: '#fff' }}>
            <Icon className={s.Icon} fill="#262626" name="close-cross" />
          </span>
        </GridItem>
      )}
      {items.map(color => (
        <GridItem
          key={color.value}
          onClick={setHandler}
          value={color.value}
          name={anchor}
          variant="circle"
        >
          <span className={s.Item} style={{ backgroundColor: color.color }} />
        </GridItem>
      ))}
    </Grid>
  ),
);

export { Colors };
export default Colors;
