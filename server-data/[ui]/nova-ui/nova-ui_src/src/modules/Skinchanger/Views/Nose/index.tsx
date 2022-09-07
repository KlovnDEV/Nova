import React from 'react';
// components
import { MappedRange } from 'components';
// utils
import { noseSliders, noseSliders2 } from '~m/Skinchanger/Utils';
// styles
import s from '~m/Skinchanger/Views/index.local.scss';
// storage
import Store from '~m/Skinchanger/Storage';

const Nose = (): JSX.Element => {
  const { setSkinMap, getSkinMap } = Store;

  return (
    <div className={s.Wrapper}>
      <div className={s.Column}>
        {noseSliders.map(item => (
          <MappedRange
            key={item.name}
            setter={setSkinMap}
            getter={getSkinMap}
            name={item.name}
            displayName={item.header}
            min={item.min}
            max={item.max}
            showCounter
          />
        ))}
      </div>
      <div />
      <div className={s.Column}>
        {noseSliders2.map(item => (
          <MappedRange
            key={item.name}
            setter={setSkinMap}
            getter={getSkinMap}
            name={item.name}
            displayName={item.header}
            min={item.min}
            max={item.max}
            showCounter
          />
        ))}
      </div>
    </div>
  );
};

export default Nose;
