import React, { useState } from 'react';
import { observer } from 'mobx-react';
// components
import { Tabs } from 'libs/UI';
import { MappedRange, ColorGrid, PayForm } from 'components';
// utils
import { hairSliders, hairSliders2 } from '~m/Skinchanger/Utils';
// styles
import s from '~m/Skinchanger/Views/index.local.scss';
import pay from './Head.local.scss';
// storage
import Store from '~m/Skinchanger/Storage';

const Head = observer((): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { setSkinMap, getSkinMap, lipstick } = Store;
  const [activeTabHair, setActiveTabHair] = useState('hair_color_1');
  const [activeTabBeard, setActiveTabBeard] = useState('beard_3');

  const hairTabs = [
    { name: 'beard_3', items: lipstick },
    { name: 'hair_color_1', items: lipstick },
    { name: 'hair_color_2', items: lipstick },
  ];

  const hairPage = [
    {
      name: 'hair_color_1',
      icon: 'man',
      label: 'Цвет Волос 1',
    },
    {
      name: 'hair_color_2',
      icon: 'man',
      label: 'Цвет Волос 2',
    },
  ];

  const beardPage = [
    {
      name: 'beard_3',
      icon: 'makeup',
      label: 'Цвет Бороды',
    },
  ];

  return (
    <div className={s.Wrapper}>
      <div className={s.Column}>
        {hairSliders.map(item => (
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
        <Tabs
          pages={hairPage}
          labels
          variant="right"
          size={50}
          controlFillColor="#fff"
          activeTab={activeTabHair}
          setActiveTab={setActiveTabHair}
        >
          {hairTabs
            .filter(item => item.name !== 'beard_3')
            .map(item => (
              <ColorGrid
                key={item.name}
                anchor={item.name}
                items={item.items}
                getter={getSkinMap}
                noRemove
              />
            ))}
        </Tabs>
      </div>
      <div className={s.Column} style={{ placeContent: 'end stretch' }}>
        {Store.shopType === 'barber' && (
          <PayForm
            className={pay.Pay}
            total={Store.price}
            buyClick={() => {
              Store.buy();
            }}
          />
        )}
      </div>
      <div className={s.Column}>
        {hairSliders2.map(item => (
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
        <Tabs
          pages={beardPage}
          labels
          variant="left"
          size={50}
          controlFillColor="#fff"
          activeTab={activeTabBeard}
          setActiveTab={setActiveTabBeard}
        >
          {hairTabs
            .filter(item => item.name === 'beard_3')
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
    </div>
  );
});

export { Head };
export default Head;
