// @/store/useTableSelectionStore.ts
import type { UserData } from '@/types/types';
import { create } from 'zustand';

interface SelectionState {
  employees: UserData[];
  setUsers: (items: UserData[]) => void;
  selectedUsers: string[];
  toggleAll: (checked: boolean) => void;
  toggleItem: (id: string) => void;
}

export const useTableSelectionStore = create<SelectionState>((set, get) => ({
  employees: [],
  selectedUsers: [],
  setUsers: (newItems: UserData[]) =>
    set({
      employees: newItems,
      selectedUsers: [],
    }),
  toggleAll: (checked) => {
    const { employees: items } = get();
    set({ selectedUsers: checked ? items.map((item) => item.email) : [] });
  },
  toggleItem: (id) => {
    const { selectedUsers: selection } = get();
    const newSelection = selection.includes(id)
      ? selection.filter((item) => item !== id)
      : [...selection, id];
    set({ selectedUsers: newSelection });
  },
}));
