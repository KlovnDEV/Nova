import { ESX, ESXInit } from '../Core';
import { InventoryItem } from './InventoryItem';

export class Inventory {

  category: string;
  identifier: string;

  constructor(category: string, identifier: string) {
    this.category = category;
    this.identifier = identifier;

    this.update();
  }

  private static Get(category: string, identifier: string) {
    return ESX.Custom.Inventory.Get(category, identifier);
  }

  static ByPlayerIdentifier(identifier: string) {
    return new Inventory('player-inventory', identifier);
  }

  get weight(): number {
    const inv = Inventory.Get(this.category, this.identifier);
    return ESX.Custom.Inventory.GetWeight(inv);
  }

  get esxData(): any {
    return Inventory.Get(this.category, this.identifier);
  }

  get exists(): boolean {
    return !!this.esxData;
  }

  get items(): Record<string, InventoryItem> {
    return Object.fromEntries(Object.entries(this.esxData.items).map(([key, item]) => [key, new InventoryItem(this, item)]));
  }

  async update(): Promise<boolean> {

    await ESXInit();

    return true;
  }

  removeItem(query: Partial<InventoryItem>, amount: number, silent: boolean = false): boolean {
    return ESX.Custom.Inventory.RemoveItem(this.esxData, query, amount, silent);
  }

  removeCash(amount: number): boolean {
    return ESX.Custom.Inventory.Cash.Remove(this.esxData, amount);
  }

  addItem(item: InventoryItem, amount: number = 1, silent: boolean = false, autoStack: boolean = false): InventoryItem {
    const res = ESX.Custom.Inventory.AddItem(this.esxData, item, amount, silent, autoStack);
    if (!res) return null;
    return new InventoryItem(res, this);
  }

  searchFirst(query: Partial<InventoryItem>) {
    const res = ESX.Custom.Inventory.SearchFirst(this.esxData, query);
    if (!res) return null;
    return new InventoryItem(res, this);
  }

  search(query: Partial<InventoryItem>, nested: boolean = false): Record<string, InventoryItem> {
    let res;
    if (nested) {
      res = ESX.Custom.Inventory.SearchWithNested(this.esxData, query);
    } else {
      res = ESX.Custom.Inventory.Search(this.esxData, query);
    }
    return Object.fromEntries(Object.entries(res).map(([key,val]) => [key, new InventoryItem(val, this)]));
  }

}