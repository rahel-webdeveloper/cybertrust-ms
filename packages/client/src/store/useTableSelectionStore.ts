// @/store/useTableSelectionStore.ts
import type { EmployeeDataResponse } from '@/queries/useEmplyeesList';
import { create } from 'zustand';

// Adjust interface to match your data structure if necessary, or keep it generic
// interface Item { id: string; name: string; /*... */ }
// Since your code uses email as the key, we'll stick with that logic.

interface SelectionState {
  items: EmployeeDataResponse[]; // Using 'any' for flexibility, ideally define the full Employee type here
  setItems: (items: EmployeeDataResponse[]) => void;
  selection: string[]; // This holds the list of selected Emails/IDs
  toggleAll: (checked: boolean) => void;
  toggleItem: (id: string) => void; // Renamed 'name' to 'id' for clarity
}

export const useTableSelectionStore = create<SelectionState>((set, get) => ({
  items: [],
  selection: [],
  setItems: (newItems: EmployeeDataResponse[]) =>
    set({
      items: newItems,
      selection: [], // Clear selection when new items arrive
    }),
  toggleAll: (checked) => {
    const { items } = get();
    // Assuming each item has a user.email field used as the ID
    set({ selection: checked ? items.map((item) => item.user.email) : [] });
  },
  toggleItem: (id) => {
    const { selection } = get();
    const newSelection = selection.includes(id)
      ? selection.filter((item) => item !== id)
      : [...selection, id];
    set({ selection: newSelection });
  },
}));
