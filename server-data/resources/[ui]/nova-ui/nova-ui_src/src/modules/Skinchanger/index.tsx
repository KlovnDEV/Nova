import React, { Fragment, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
// components
import { Tabs } from 'libs/UI';
// views
import { Register, Morphology, Face, Head, Confirm } from './Views';
// styles
import s from './index.local.scss';
// storage
import Storage from '~m/Skinchanger/Storage';

const views = [
  {
    name: 'register',
    component: <Register />,
    icon: 'idcard',
    label: 'Данные',
    tags: ['skin'],
  },
  {
    name: 'morphology',
    component: <Morphology />,
    icon: 'dna',
    label: 'Морфология',
    tags: ['skin'],
  },
  {
    name: 'face',
    component: <Face />,
    icon: 'face',
    label: 'Лицо',
    tags: ['skin'],
  },
  {
    name: 'head',
    component: <Head />,
    icon: 'man',
    label: 'Голова',
    tags: ['skin', 'barber'],
  },
  {
    name: 'confirm',
    component: <Confirm />,
    icon: 'check',
    label: 'Подтвердить',
    tags: ['skin'],
  },
];

const SkinchangerProto = (): JSX.Element => {
  const tabs = useMemo(
    () => views.filter(item => item.tags.includes(Storage.shopType)),
    [Storage.shopType],
  );

  return (
    <div className={s.Wrapper}>
      <Tabs
        pages={tabs}
        align="center"
        labels
        controlFillColor="#fff"
        activeTab={Storage.activeTab}
        setActiveTab={Storage.setActiveTab}
      >
        {tabs.map(view => (
          <Fragment key={view.name}>{view.component}</Fragment>
        ))}
      </Tabs>
    </div>
  );
};

export const Skinchanger = observer(SkinchangerProto);
export default Skinchanger;
