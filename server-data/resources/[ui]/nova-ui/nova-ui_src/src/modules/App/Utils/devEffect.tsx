/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import InvStore from 'modules/Inventory/Storage';
import Invs from 'modules/Inventory/devMock';
import CraftStorage from 'modules/Craft/Storage';
import SkinchangerStore from 'modules/Skinchanger/Storage';
import GasStationsStore from 'modules/GasStations/Storage';
import AppStorage from 'modules/App/Storage';
import MenuStore from 'modules/Menu/Storage';
import { genRandom } from 'utils';

const devEffect: () => void = () => {
  return useEffect((): void => {
    AppStorage.isUIVisible = true;
    InvStore.setInventories(Invs);
    CraftStorage.Categories = [
      {
        name: 'Еда',
        icon: 'fruitpot',
      },
      {
        name: 'Напитки',
        icon: 'water',
      },
      {
        name: 'Фермерство',
        icon: 'water',
      },
    ];

    CraftStorage.fetchRecipes();

    CraftStorage.fetchTasks();

    SkinchangerStore.blush_3 = genRandom();
    SkinchangerStore.makeup_3 = genRandom();
    SkinchangerStore.makeup_4 = genRandom();
    SkinchangerStore.lipstick = genRandom();

    GasStationsStore.brand = 'xero';
    GasStationsStore.index = 3;
    GasStationsStore.amount = 75;
    GasStationsStore.description = 'Заправка где-то';

    // Chat open
    window.addEventListener(
      'keydown',
      e => {
        if (e.key === 't') {
          const event = new CustomEvent('message');
          Object.assign(event, { data: { query: 'chat/open' } });
          window.dispatchEvent(event);
        }

        if (e.key === '`') {
          MenuStore.menuShown = true;
        }
      },
      false,
    );
  }, []);
};

export default devEffect;
