export type IShopItem = {
  category?: 'accs' | 'jbib' | 'feet' | 'lowr';
  price: number;
  uid: string;
  variations?: Array<string>;
};

export type ShopItems = {
  [name: string]: IShopItem[];
};
