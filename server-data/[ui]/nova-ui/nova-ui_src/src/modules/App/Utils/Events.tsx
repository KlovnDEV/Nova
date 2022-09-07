import { useHistory } from 'react-router-dom';
import useClientQuery from 'utils/useClientQuery';
import AppStore from 'modules/App/Storage';
import BankStore from 'modules/Bank/Storage';
import CraftStore from 'modules/Craft/Storage';
import InventoryStore from 'modules/Inventory/Storage';
import ChatStore from 'modules/Chat/Storage';
import MenuStore from 'modules/Menu/Storage';
import IndicatorsStore from 'modules/Indicators/Storage';
import NotificationsStore from 'modules/Notifications/Storage';
import SkinchangerStore from 'modules/Skinchanger/Storage';
import AnimationsStore from 'modules/Animations/Storage';
import PlayerInfoStore from 'modules/PlayerInfo/Storage';
import GasStationsStore from 'modules/GasStations/Storage';
import HealthCheckStore from 'modules/HealthCheck/Storage';
import ShopStore from 'modules/Shop/Storage';
import API from 'API';
import T from '~m/Inventory/types';
import ClothesShopStore from '~m/ClothesShop/Storage';
import CarShopStore from '~m/CarShop/Storage';
import { PayFormStorage } from '~cmp/PayForm/Storage';

function itemArrayToMap(items: any[]): Record<any, any> {
  if (!Array.isArray(items)) return items;

  const itemMap = {};
  items.forEach(item => {
    if (item) {
      itemMap[item.uid] = item;
    }
  });

  return itemMap;
}

const Events = (): JSX.Element => {
  const history = useHistory();
  let hairColors;
  let sugg;

  useClientQuery((category: string, query: string, args: AnyObject) => {
    if (category === 'close') {
      InventoryStore.setInventories({});
      history.push('/', {});
      ChatStore.close();
    }

    if (category === 'inventory') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          // console.log('show', args);

          // FIXME FIXME FIXME
          Object.values(args.inventories).forEach((inv: any) => {
            // eslint-disable-next-line no-param-reassign
            inv.items = itemArrayToMap(inv.items);
          });

          Object.values(InventoryStore.inventories).forEach((inv: T.Inventory) => {
            InventoryStore.setInventoryOpen(inv.id, false);
          });

          InventoryStore.setInventories(args.inventories);
          history.push('/inventory', {});
          AppStore.refs.app.current.focus();
          break;

        case 'hide':
          history.push('/', {});
          break;

        case 'update':
          // FIXME
          // eslint-disable-next-line no-param-reassign
          args.inventory.items = itemArrayToMap(args.inventory.items);
          InventoryStore.setInventory({ id: args.inventory.id, inventory: args.inventory });
          break;

        default:
          throw new Error(`Unknown inventory query! Query: ${query}`);
      }
    }

    if (category === 'craft') {
      switch (query) {
        case 'open':
          AppStore.setUIVisible(true);
          CraftStore.Categories = args.categories;
          CraftStore.CraftInventoryId = args.craftInventoryId;
          CraftStore.Inventories = args.inventories;
          history.push('/craft');

          break;

        default:
          throw new Error(`Unknown craft query! Query: ${query}`);
      }
    }

    if (category === 'menu') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          MenuStore.menuShown = true;
          MenuStore.focusedButton = 0;
          MenuStore.name = args.name;
          MenuStore.position = args.position;
          MenuStore.buttons = args.elements;
          break;

        case 'hide':
          MenuStore.menuShown = false;
          break;

        default:
          throw new Error(`Unknown menu query! Query: ${query}`);
      }
    }

    if (category === 'indicators') {
      switch (query) {
        case 'car/hide':
          IndicatorsStore.Car.speed = null;
          break;

        case 'car':
          Object.assign(IndicatorsStore.Car, args);
          break;

        case 'set':
          Object.assign(IndicatorsStore.IndicatorsValues, args);
          break;

        case 'location':
          Object.assign(IndicatorsStore.Location, args);
          break;

        case 'voice/proximity':
          IndicatorsStore.Voice.proximity = args.value;
          break;

        case 'voice/talk':
          IndicatorsStore.Voice.talking = args.value;
          break;

        case 'buffs':
          IndicatorsStore.Buffs = args.buffs;
          break;

        default:
          throw new Error(`Unknown indicators query! Query: ${query}`);
      }
    }

    if (category === 'clothesshop') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          ClothesShopStore.availShopItems = args.clothes;
          history.push('/clothesshop', {});
          AppStore.refs.app.current.focus();
          break;

        default:
          throw new Error(`Unknown clothesshop query! Query: ${query}`);
      }
    }

    if (category === 'shop') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          ShopStore.shopId = args.shopId;
          ShopStore.Items = args.items;
          ShopStore.Warehouse = args.warehouse;
          PayFormStorage.bank = args.money.bank;
          PayFormStorage.cash = args.money.cash;
          ShopStore.Search = '';
          ShopStore.Cart = [];
          history.push('/shop', {});
          AppStore.refs.app.current.focus();
          break;

        case 'update':
          ShopStore.Items = args.items;
          break;

        default:
          throw new Error(`Unknown shop query! Query: ${query}`);
      }
    }

    if (category === 'skin') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          SkinchangerStore.shopType = args.shopType ?? 'skin';
          SkinchangerStore.setActiveTab(args.shopType == 'barber' ? 'head' : 'register');
          SkinchangerStore.setSkin(args.skin);

          hairColors = args.hairColors;

          SkinchangerStore.hair_color_1 = hairColors;
          SkinchangerStore.hair_color_2 = hairColors;
          SkinchangerStore.beard_3 = hairColors;
          SkinchangerStore.lipstick = hairColors;
          SkinchangerStore.makeup_3 = hairColors;
          SkinchangerStore.makeup_4 = hairColors;

          SkinchangerStore.blush_3 = args.makeupColors;

          history.push('/skin', {});

          break;

        case 'hide':
          history.push('/', {});
          break;

        default:
          throw new Error(`Unknown skin query! Query: ${query}`);
      }
    }

    if (category === 'notifications') {
      switch (query) {
        case 'add':
          NotificationsStore.addMessage(
            args.icon || 'notification-message',
            args.text,
            args.ttl || 10,
          );
          break;
        default:
          throw new Error(`Unknown notifications query! Query: ${query}`);
      }
    }

    if (category === 'chat') {
      switch (query) {
        case 'open':
          AppStore.setUIVisible(true);
          if (ChatStore.textareaRef.current) ChatStore.textareaRef.current.focus();
          ChatStore.activeChat = '/me';
          ChatStore.setChatShown('input');
          ChatStore.updateWindowTimer();
          break;
        case 'message':
          ChatStore.updateWindowTimer();
          if (!ChatStore.chatShown) {
            ChatStore.setChatShown('view');
          }

          if (args.message.args) {
            ChatStore.messages.push({
              args: args.message.args,
              color: args.message.color,
            });
          }
          break;

        case 'addSuggestion':
          sugg = args.suggestion;
          ChatStore.suggestions[sugg.name] = sugg;
          break;

        case 'removeSuggestion':
          sugg = args.suggestion;
          delete ChatStore.suggestions[sugg.name];
          break;

        case 'clear':
          ChatStore.clear();
          break;
        case 'hidden':
          // if (args.hidden) {
          //   ChatStore.setChatShown('force-hidden');
          // } else if (ChatStore.chatShown === 'force-hidden') {
          //   ChatStore.setChatShown(false);
          // }
          break;

        default:
          throw new Error(`Unknown chat query! Query: ${query}`);
      }
    }

    if (category === 'animations') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          AnimationsStore.Cells = args.cells;
          AnimationsStore.InCar = args.inCar;
          history.push('/animations', {});
          break;
        default:
          throw new Error(`Unknown animations query! Query: ${query}`);
      }
    }

    if (category === 'ui') {
      switch (query) {
        case 'showPopup':
          AppStore.setUIVisible(true);
          AppStore.showPopup({
            menu: args.menu.map(item => ({
              name: item.name,
              label: item.label,
              onClick: e => {
                API.query('ui/popup/click', { item }).catch(() => {});
                AppStore.showPopup(null);
              },
            })),
            x: args.x,
            y: args.y,
            onClose: e => {
              API.query('ui/popup/close', {}).catch(() => {});
              AppStore.showPopup(null);
            },
          });
          break;

        case 'toggle':
          AppStore.setUIVisible(!AppStore.isUIVisible);
          break;

        default:
          throw new Error(`Unknown ui query! Query: ${query}`);
      }
    }

    if (category === 'bank') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          history.push('/bank');
          break;
        case 'update':
          BankStore.cash = args.cash;
          BankStore.balance = args.bank;
          break;
        case 'hide':
          history.push('/', {});
          break;
        default:
          throw new Error(`Unknown bank query! Query: ${query}`);
      }
    }

    if (category === 'playerinfo') {
      switch (query) {
        case 'show':
          AppStore.setUIVisible(true);
          AppStore.isPlayerInfoVisible = true;
          AppStore.refs.app.current.focus();
          break;
        case 'hide':
          AppStore.isPlayerInfoVisible = false;
          AppStore.showPopup(null);
          AppStore.showTooltip(null);
          break;
        case 'update':
          if (args.bank !== undefined) PlayerInfoStore.bank = args.bank;
          if (args.cash !== undefined) PlayerInfoStore.cash = args.cash;
          if (args.phone !== undefined) {
            if (args.phone == 'empty') {
              PlayerInfoStore.phone = 'нет телефона';
            } else {
              PlayerInfoStore.phone = `#${args.phone}`;
            }
          }
          break;

        case 'updateSkills':
          PlayerInfoStore.skills = args.skills;
          break;

        default:
          throw new Error(`Unknown playerinfo query! Query: ${query}`);
      }
    }

    if (category === 'gasstations') {
      switch (query) {
        case 'show':
          GasStationsStore.brand = args.brand;
          GasStationsStore.index = args.index;
          history.push('/gasstations', {});
          break;
        case 'hide':
          history.push('/', {});
          break;
        case 'update':
          GasStationsStore.amount = args.amount;
          GasStationsStore.capacity = args.capacity;
          GasStationsStore.tankerAmount = args.tankerAmount;
          GasStationsStore.tankerCapacity = args.tankerCapacity;
          break;
        default:
          throw new Error(`Unknown gas-station query! Query: ${query}`);
      }
    }

    if (category === 'health') {
      switch (query) {
        case 'show':
          HealthCheckStore.DamageMap = args.damageMap;
          HealthCheckStore.PersonInfo = args.personInfo;
          HealthCheckStore.SelectedRegion = null;
          history.push('/health', {});
          break;
        case 'hide':
          history.push('/', {});
          break;
        case 'update':
          HealthCheckStore.DamageMap = args.damageMap;
          HealthCheckStore.PersonInfo = args.personInfo;
          break;
        default:
          throw new Error(`Unknown health query! Query: ${query}`);
      }
    }

    if (category === 'carshop') {
      switch (query) {
        case 'show':
          CarShopStore.categories = args.categories;
          history.push('/carshop', {});
          break;
        case 'hide':
          history.push('/', {});
          break;
        case 'update':
          CarShopStore.categories = args.categories;
          break;
        default:
          throw new Error(`Unknown carshop query! Query: ${query}`);
      }
    }
  });

  return null;
};

export default Events;
