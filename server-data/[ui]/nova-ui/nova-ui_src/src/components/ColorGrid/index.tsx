import React from 'react';
import { observer } from 'mobx-react';
// components
import { Grid, Icon } from 'libs/UI';
import { GridItem } from 'components/GridItem';
// Storage
import { setMapItem } from 'modules/Skinchanger/Utils/setMapItem';
import Store from 'modules/Skinchanger/Storage';
// styles
import s from './index.local.scss';

const { deleteSkinMapItem } = Store;

type IProps = {
  anchor: string;
  items: AnyObject;
  getter: { (target: number | string): number | string };
  cols?: number;
  itemSize?: number;
  justify?: 'left' | 'center' | 'right';
  gap?: number | [number, number];
  noRemove?: boolean;
};

const ColorGrid = observer(
  ({
    anchor,
    items,
    getter,
    cols = 10,
    itemSize = 20,
    justify = 'left',
    gap = 8,
    noRemove = false,
  }: IProps): JSX.Element => (
    <Grid key={anchor} cols={cols} itemSize={itemSize} gap={gap} justify={justify}>
      {!noRemove && (
        <GridItem
          onClick={() => deleteSkinMapItem(anchor)}
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
          onClick={setMapItem}
          value={color.value}
          name={anchor}
          variant="circle"
          active={color.value === getter(anchor)}
        >
          <span className={s.Item} style={{ backgroundColor: color.color }} />
        </GridItem>
      ))}
    </Grid>
  ),
);

export { ColorGrid };
export default ColorGrid;
