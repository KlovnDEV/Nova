import React, { Fragment, useState } from 'react';
// components
import { Tabs } from 'libs/UI';
import Nose from '../Nose';
import Eyes from '../Eyes';
import FaceShape from '../FaceShape';
import SkinDamage from '../SkinDamage';
import Makeup from '../Makeup';
// styles
import s from './index.local.scss';

const views = [
  {
    name: 'nose',
    component: <Nose />,
    icon: 'nose',
    label: 'Нос',
  },
  {
    name: 'eyes',
    component: <Eyes />,
    icon: 'eye-eyebrows',
    label: 'Глаза и брови',
  },
  {
    name: 'face-shape',
    component: <FaceShape />,
    icon: 'face-shape',
    label: 'Черты лица',
  },
  {
    name: 'skin-damage',
    component: <SkinDamage />,
    icon: 'skin-damage',
    label: 'Кожа',
  },
  {
    name: 'makeup',
    component: <Makeup />,
    icon: 'makeup',
    label: 'Косметика',
  },
];

const Face = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('nose');
  return (
    <Tabs
      pages={views}
      align="center"
      size={50}
      parentWrapperClass={s.FaceWrapper}
      labels
      controlFillColor="#fff"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {views.map(view => (
        <Fragment key={view.name}>{view.component}</Fragment>
      ))}
    </Tabs>
  );
};

export { Face };
export default Face;
