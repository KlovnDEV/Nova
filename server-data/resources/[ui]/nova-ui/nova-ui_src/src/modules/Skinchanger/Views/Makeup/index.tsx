/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
// components
import { Tabs } from 'libs/UI';
import { MappedRange, ColorGrid } from 'components';
// utils
import { makeupSliders, makeupSliders2 } from '~m/Skinchanger/Utils';
// styles
import s from '~m/Skinchanger/Views/index.local.scss';
// storage
import Store from '~m/Skinchanger/Storage';

const Makeup = (): JSX.Element => {
  const { setSkinMap, getSkinMap, blush_3, makeup_3, makeup_4, lipstick } = Store;
  const [activeTabBlush, setActiveTabBlush] = useState('blush_3');
  const [activeTabMakeup, setActiveTabMakeup] = useState('makeup_3');

  const makeupTabs = [
    { name: 'blush_3', items: blush_3 },
    { name: 'makeup_3', items: makeup_3 },
    { name: 'makeup_4', items: makeup_4 },
    { name: 'lipstick_3', items: lipstick },
  ];

  const blushPage = [
    {
      name: 'blush_3',
      icon: 'face',
      label: 'Цвет раскраски лица',
    },
  ];

  const makeupPage = [
    {
      name: 'makeup_4',
      icon: 'makeup',
      label: 'Цвет макияжа 1',
    },
    {
      name: 'makeup_3',
      icon: 'makeup',
      label: 'Цвет макияжа 2',
    },
    {
      name: 'lipstick_3',
      icon: 'lipstick',
      label: 'Цвет помады',
    },
  ];

  const makeup1 = makeupSliders.map(item => (
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

  const makeup2 = makeupSliders2.map(item => (
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
        {makeup1}
        <Tabs
          pages={blushPage}
          labels
          variant="right"
          size={50}
          controlFillColor="#fff"
          activeTab={activeTabBlush}
          setActiveTab={setActiveTabBlush}
        >
          {makeupTabs
            .filter(item => item.name === 'blush_3')
            .map(item => (
              <ColorGrid
                key={item.name}
                anchor={item.name}
                items={item.items}
                getter={getSkinMap}
              />
            ))}
        </Tabs>
      </div>
      <div />
      <div className={s.Column}>
        {makeup2}
        <Tabs
          pages={makeupPage}
          labels
          variant="left"
          size={50}
          controlFillColor="#fff"
          activeTab={activeTabMakeup}
          setActiveTab={setActiveTabMakeup}
        >
          {makeupTabs
            .filter(item => item.name !== 'blush_3')
            .map(item => (
              <ColorGrid
                key={item.name}
                anchor={item.name}
                items={item.items}
                getter={getSkinMap}
                noRemove={item.name === 'makeup_3'}
              />
            ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Makeup;
