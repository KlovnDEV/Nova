import axios from 'axios';
import { observable, computed, action, makeAutoObservable } from 'mobx';
// types
import { IShopItem, ShopItems } from '~m/ClothesShop/types/index';

const pathBlank = (sex, category, name): string => {
  return `${ASSETS}/img/clothes/${sex}/${category}/${name}.jpg`;
};

type ShopCartEntry = { uid: string; variation?: string };

class ClothesShopStoreProto {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  @observable isFemale = false;

  @observable currentCategory = 'torso';

  @observable availShopItems: ShopItems = {
    torso: [
      {
        uid: '-42779177',
        price: 200,
      },
      {
        uid: '100',
        price: 450,
        variations: ['102', '103', '104', '105', '106'],
      },
    ],
    accs: [
      {
        uid: 'CLO_ADD',
        price: 400,
      },
      {
        uid: 'CLO_BBM_U_1_0',
        price: 950,
        variations: ['CLO_BBM_U_2_0'],
      },
    ],
    feet: [
      {
        uid: 'CLO_EXM_AF_2_0',
        price: 600,
        variations: ['CLO_EXM_AF_3_0', 'CLO_EXM_AF_4_0'],
      },
    ],
  };

  @observable cart: Record<string, ShopCartEntry> = {};

  @computed get cartEntries() {
    return Object.entries(this.cart);
  }

  // @computed get TotalPrice() {
  //   return this.cartEntries
  //     .filter(item => item[0].indexOf('Color') === -1)
  //     .map(item => this.availShopItems[item[1] as any].price)
  //     .reduce((a, b) => a + b, 0);
  // }

  @action addToCart(uid: string): void {
    const isExist = this.findInCart(uid);
    if (isExist) {
      delete this.cart[this.currentCategory];
    } else {
      this.cart[this.currentCategory] = { uid };
    }

    if (this.cartEntries.length) {
      axios.post(`http://nova-ui/updateClothPreview`, this.cart).catch(() => {});
    }
  }

  @action setVariation(varUid: string): void {
    console.log(this);
    if (!this.cart[this.currentCategory]) return;
    const isExist = this.cart[this.currentCategory].variation === varUid;

    if (isExist) {
      delete this.cart[this.currentCategory].variation;
    } else {
      this.cart[this.currentCategory].variation = varUid;
    }

    if (this.cartEntries.length) {
      axios.post(`http://nova-ui/updateClothPreview`, this.cart).catch(() => {});
    }
  }

  @action findInCart(itemName: string): string {
    const target = this.cartEntries.find(item => item[1].uid === itemName)?.[0];
    return target ?? null;
  }

  @action findItemVariation(itemName: string): string {
    const target = this.cart[this.currentCategory]?.variation;
    if (!target) return null;
    if (itemName === target) return itemName;
    return null;
  }

  @action deleteItem(items) {
    items.forEach(item => delete this.cart[item]);
  }

  @action buy() {
    if (this.cartEntries.length) {
      // axios.post(`http://${Config.RESOURCE_NAME}/buy`, this.cart).finally(() => {
      //   this.cart = {};
      // });
    }
  }

  getItemColors(): IShopItem[] {
    const itemId = this.cart[this.currentCategory]?.uid;
    if (!itemId) return [];
    const target = this.ShopItems().find(item => item.uid === itemId);
    if (!target) return [];
    return (
      target.variations?.map(item => ({
        uid: item,
        price: target.price,
        category: target.category,
      })) ?? []
    );
  }

  @computed ShopItems(): IShopItem[] {
    return this.availShopItems[this.currentCategory];
  }

  getItemImage(uid: string): string {
    return pathBlank(this.isFemale ? 'female' : 'male', this.currentCategory, uid);
  }
}

const ClothesShopStore = new ClothesShopStoreProto();
export default ClothesShopStore;
