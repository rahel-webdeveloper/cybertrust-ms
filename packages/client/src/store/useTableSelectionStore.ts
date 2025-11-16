import { create } from 'zustand';

export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface SelectionState {
  items: Item[];
  selection: string[];
  toggleAll: (checked: boolean) => void;
  toggleItem: (name: string) => void;
}

export const useTableSelectionStore = create<SelectionState>((set, get) => ({
  items: [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
    { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
    { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
    { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
    { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
  ],
  selection: [],
  toggleAll: (cheked) => {
    const { items } = get();
    set({ selection: cheked ? items.map((item) => item.name) : [] });
  },
  toggleItem: (name) => {
    const { selection } = get();
    // Add name if not present, remove if present
    const newSelection = selection.includes(name)
      ? selection.filter((item) => item !== name)
      : [...selection, name];
    set({ selection: newSelection });
  },
}));
