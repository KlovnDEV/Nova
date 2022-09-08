import { MutableRefObject } from 'react';
// import { DragObjectWithType } from 'react-dnd';

interface InventoryItemAction {
  key: string;
  label: string;
  priority?: number;
}

interface InventoryItem {
  uid: number;
  text: string;
  label?: string;
  description?: string;
  name: string;
  category: string;
  width: number;
  height: number;
  weight?: number;
  x: number;
  y: number;
  amount: number;
  actions?: Record<string, InventoryItemAction[]>;
  extra?: Record<string, any>;
}
interface Inventory {
  identifier: string;
  id?: string;
  focused?: boolean;
  x?: number;
  y?: number;
  open?: boolean;
  singleItem: boolean;
  allowedCategories: Array<string>;
  areas: Record<string, { id: number; x: number; y: number; tags?: string[] }>;
  actionGroup: string;
  items: {
    [x: number]: InventoryItem;
  };
  width: number;
  height: number;
  weight: number;
  maxWeight: number;
  category: string | 'player-inventory';
  title: string;
  collision?: AnyObject;
}

interface IDragItem {
  type: string;
  data?: Inventory | InventoryItem;
  ref?: MutableRefObject<undefined>;
}

type Inventories = Record<string, Inventory>;

export { InventoryItem, InventoryItemAction, Inventory, IDragItem, Inventories };
