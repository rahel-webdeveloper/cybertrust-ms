// @/store/useTableSelectionStore.ts
import type { EmployeeDataResponse } from '@/queries/employees';
import { create } from 'zustand';

// Adjust interface to match your data structure if necessary, or keep it generic
// interface Item { id: string; name: string; /*... */ }
// Since your code uses email as the key, we'll stick with that logic.

interface SelectionState {
  items: EmployeeDataResponse[];
  setItems: (items: EmployeeDataResponse[]) => void;
  selectedUsers: string[];
  toggleAll: (checked: boolean) => void;
  toggleItem: (id: string) => void;
}

export const useTableSelectionStore = create<SelectionState>((set, get) => ({
  items: [],
  selectedUsers: [],
  setItems: (newItems: EmployeeDataResponse[]) =>
    set({
      items: newItems,
      selectedUsers: [], // Clear selection when new items arrive
    }),
  toggleAll: (checked) => {
    const { items } = get();
    // Assuming each item has a user.email field used as the ID
    set({ selectedUsers: checked ? items.map((item) => item.user.email) : [] });
  },
  toggleItem: (id) => {
    const { selectedUsers: selection } = get();
    const newSelection = selection.includes(id)
      ? selection.filter((item) => item !== id)
      : [...selection, id];
    set({ selectedUsers: newSelection });
  },
}));
