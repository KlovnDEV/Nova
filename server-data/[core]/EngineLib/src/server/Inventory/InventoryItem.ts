import { ESX } from "../Core";

export class InventoryItem {
  uid: number;
  name: string;
  label: string;
  amount: number;
  stack: number;
  weight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  extra: Record<string, any>;
  parent: { removeItem: (query: Partial<InventoryItem>, amount: number, silent: boolean) => boolean };

  constructor(itemInfo: Partial<InventoryItem>, inventory: any) {
    Object.assign(this, itemInfo);
    this.parent = inventory;
  }

  static Create(name: string, amount: number = 1 , extra: any = {}) {
    return new InventoryItem(ESX.Custom.Inventory.Item.Create(name, amount, extra), null);
  }

  remove(amount: number, silent: boolean = false): boolean {
    if (!this.parent) throw new Error('Item has no parent Inventory!');
    return this.parent.removeItem({ uid: this.uid }, amount, silent);
  }
}