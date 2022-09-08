export type IShopItem = {
  name: string;
  displayName: string;
  category: string;
  price: number;
  quantity: number;
  owner: string;
  uid: number | string;
  stored?: boolean;
};

export type IShopLink = {
  category: string;
  name: string;
  action: { (x: string): void };
  isActive: boolean;
  icon?: string;
};
