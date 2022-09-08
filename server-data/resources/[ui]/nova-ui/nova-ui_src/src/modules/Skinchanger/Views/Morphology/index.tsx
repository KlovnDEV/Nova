import React from 'react';
import { observer } from 'mobx-react';
// components
import { ColorGrid, Grid, GridItem, MappedRange } from 'components';
// utils
import { imgReader } from 'utils/fileReaders';
import { skin, setMapItem } from 'modules/Skinchanger/Utils';
// styles
import Store from 'modules/Skinchanger/Storage';
import s from './index.local.scss';
// store

const faces = imgReader(require.context(`${ASSETS}/img/faces/`, false, /^assets.*\.(jpg)$/));

const mappedFaces = faces.map(face => ({
  path: face.originalPath,
  value: parseInt(face.originalPath.split('/').pop(), 10),
}));

const Morphology = observer((): JSX.Element => {
  const { setSkinMap, getSkinMap } = Store;

  return (
    <div className={s.Wrapper}>
      <div className={s.Column}>
        <p className={s.Heading}>Отцовская линия</p>
        <Grid cols={5} itemSize={64} gap={2}>
          {mappedFaces.map(face => (
            <GridItem
              key={face.value}
              onClick={setMapItem}
              value={face.value}
              name="face"
              active={face.value === getSkinMap('face')}
            >
              <img src={face.path} alt="" />
            </GridItem>
          ))}
        </Grid>
      </div>
      <div className={s.ColumnReverse}>
        <MappedRange
          setter={setSkinMap}
          getter={getSkinMap}
          name="face_blend"
          displayName="Генетическая склонность"
          min={0}
          max={10}
          className={s.Range}
        />
        <ColorGrid
          anchor="skin"
          items={skin}
          cols={skin.length}
          itemSize={24}
          gap={8}
          justify="center"
          getter={getSkinMap}
          noRemove
        />
      </div>
      <div className={s.Column}>
        <p className={s.Heading}>Материнская линия</p>
        <Grid cols={5} itemSize={64} gap={2}>
          {mappedFaces.map(face => (
            <GridItem
              key={face.value}
              onClick={setMapItem}
              value={face.value}
              name="face_2"
              active={face.value === getSkinMap('face_2')}
            >
              <img src={face.path} alt="" />
            </GridItem>
          ))}
        </Grid>
      </div>
    </div>
  );
});

export { Morphology };
export default Morphology;
