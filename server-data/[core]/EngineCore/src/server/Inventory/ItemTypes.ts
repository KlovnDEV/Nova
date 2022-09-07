import type Player from '@nova/engine-lib/server/Game';
import type { Inventory } from './Inventory';
import type { InventoryItem } from './InventoryItem';

export type ItemType = {
  onAdd: { (item: InventoryItem, inv: Inventory): void };
  merge: { (player: Player, inv1: Inventory, item1: InventoryItem, inv2: Inventory, item2: InventoryItem): boolean };
  getActions: { (item: InventoryItem): any[] };
  getDescription: { (item: InventoryItem): string };
};

export const ItemTypes: Record<string, ItemType> = {};
