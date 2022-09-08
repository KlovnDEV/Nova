/* Нет менюшки */
import './peds';
import { TargettedCamera } from '@nova/engine-lib/client/Graphics';
import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { DisabledControl, Keys } from '@nova/engine-lib/client/Input';
import { Menu, MenuElement } from '@nova/engine-lib/client/UI';
import { Log } from '@nova/engine-lib/shared';
import { Markers, ShopConfig } from './markers';
import { Skin } from './skin';

const camera = new TargettedCamera({
  minDistance: 1.0,
  maxDistance: 3.0,
  controlsEnabled: false,
});

type TattooInfo = {
  name: string;
  collection: string;
  category: string;
  price: number;
};

function openShop(shop: ShopConfig) {
  LocalPlayer.ped.coords = shop.player.coords;

  const camInfo = shop.cameras.legs;

  camera.target = LocalPlayer.ped.coords.addXYZ(0, 0, camInfo.camOffset);
  camera.heading = camInfo.angle; // LocalPlayer.ped.heading + 90.0;
  camera.minDistance = 1.0 * camInfo.zoomOffset;
  camera.maxDistance = 2.0 * camInfo.zoomOffset;
  camera.controlsEnabled = true;
  camera.start();

  Skin.setNaked();

  const insideShop = setTick(() => {
    if (DisabledControl.JustReleased(Keys.ESC)) {
      Skin.reset();
      camera.stop();
      clearTick(insideShop);
    }
  });

  emitNet('engine:openTattooShop', 1);
}

const markers = new Markers(openShop);

setTick(() => {
  markers.update();

  if (camera.isActive) {
    DisableAllControlActions(0);
    camera.target = LocalPlayer.ped.coords;
    camera.update();
  }
});

function openShopMenuCategory(shopid, tattooList: TattooInfo[], category: string) {
  const elements: MenuElement[] = [];

  tattooList
    .filter(info => info.category == category)
    .forEach(info => {
      elements.push({ label: `${info.collection}/${info.name}`, value: `${info.collection}/${info.name}` });
    });

  const menu = new Menu({
    name: 'tattoo_menu_cat',
    title: 'Татуировка',
    position: 'tr',
    elements,

    onClick: cmd => {
      const [collection, tattooName] = cmd.split('/');
      LocalPlayer.ped.decoration.add(collection, tattooName);
    },

    onChange: cmd => {
      Log.debug('on change', cmd);
      LocalPlayer.ped.decoration.clearAll(true);
      const [collection, tattooName] = cmd.split('/');
      LocalPlayer.ped.decoration.add(collection, tattooName);
    },

    onBack: () => {
      menu.hide();
      openShopMenu(shopid, tattooList);
    },
  });

  menu.show();
}

function openShopMenu(shopid, tattooList: TattooInfo[]) {
  const elements: MenuElement[] = [];

  const categories = [...new Set(tattooList.map((item: TattooInfo) => item.category))];

  categories.forEach(cat => {
    elements.push({ label: cat, value: cat });
  });

  const menu = new Menu({
    name: 'tattoo_menu',
    title: 'Татуировка',
    position: 'tr',
    elements,

    onClick: cmd => {
      menu.hide();
      openShopMenuCategory(shopid, tattooList, cmd);
    },

    onBack: () => {
      TriggerEvent('nova-ui:menu_hide');
    },
  });

  menu.show();
}

onNet('engine:openTattooShop', (shopid, tattooList) => {
  openShopMenu(shopid, tattooList);
});
