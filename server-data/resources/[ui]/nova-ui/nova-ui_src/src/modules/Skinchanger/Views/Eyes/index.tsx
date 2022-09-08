/* eslint-disable camelcase */
import React from 'react';
// components
import { ColorGrid, MappedRange } from 'components';
// utils
import { eye_color, eyeSliders, eyeSliders2 } from 'modules/Skinchanger/Utils';
// styles
import s from 'modules/Skinchanger/Views/index.local.scss';
// storage
import Store from 'modules/Skinchanger/Storage';

const Eyes = (): JSX.Element => {
  const { setSkinMap, getSkinMap } = Store;

  const eyeColorSlider = eyeSliders2.map(item => (
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
  ));

  return (
    <div className={s.Wrapper}>
      <div className={s.Column}>
        {eyeSliders.map(item => (
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
        <ColorGrid
          anchor="eye_color"
          items={eye_color}
          cols={eye_color.length}
          itemSize={24}
          gap={8}
          justify="center"
          getter={getSkinMap}
          noRemove
        />
        {eyeColorSlider}
      </div>
    </div>
  );
};

export default Eyes;
