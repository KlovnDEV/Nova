import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Tabs } from 'libs/UI';
import s from './index.local.scss';
import { View } from './Views';
import Store from '~m/ClothesShop/Storage';

const shopMenu = [
  {
    page: 'Верхняя одежда',
    name: 'torso',
    icon: 'uppr',
  },
  {
    page: 'Кепки и шапки',
    name: 'helmet',
    icon: 'clothes-hat',
  },
  {
    page: 'Штаны, юбки и т.д.',
    name: 'pants',
    icon: 'lowr',
  },
  {
    page: 'Обувь',
    name: 'shoes',
    icon: 'feet',
  },
  // {
  //   page: 'Сумки и рюкзаки',
  //   name: 'hand',
  //   icon: 'handbag',
  // },
  {
    page: 'Очки',
    name: 'glasses',
    icon: 'props-accs',
  },
  {
    page: 'Часы',
    name: 'watches',
    icon: 'props-accs',
  },

  {
    page: 'Серьги',
    name: 'ears',
    icon: 'props-accs',
  },
  {
    page: 'Цепи',
    name: 'chain',
    icon: 'props-accs',
  },
];

const Accesories = [
  {
    page: 'Бижутерия',
    name: 'jewelry',
  },
  {
    page: 'Шарфы, галстуки и т.д.',
    name: 'teef',
  },
  {
    page: 'Часы, браслеты и т.д.',
    name: 'wrists',
  },
  {
    page: 'Маски и шапки',
    name: 'head',
  },
];

const Shop = (): JSX.Element => {
  const setCategory = (category: string) => {
    Store.currentCategory = category;
  };

  useEffect(() => {
    setCategory(shopMenu[0].name);
  }, []);

  return (
    <div className={s.Wrapper}>
      <Tabs
        pages={shopMenu}
        activeTab={Store.currentCategory}
        setActiveTab={setCategory}
        align="center"
      >
        {shopMenu.map(item => (
          <View key={item.name} category={item.page} />
        ))}
      </Tabs>
    </div>
  );
};

export const ClothesShop = observer(Shop);

export default ClothesShop;
