// @/store/useTableSelectionStore.ts
import type { EmployeeDataResponse } from '@/queries/employees';
import { create } from 'zustand';

interface SelectionState {
  employees: EmployeeDataResponse[];
  setEmployees: (items: EmployeeDataResponse[]) => void;
  selectedUsers: string[];
  toggleAll: (checked: boolean) => void;
  toggleItem: (id: string) => void;
}

export const useTableSelectionStore = create<SelectionState>((set, get) => ({
  employees: [],
  selectedUsers: [],
  setEmployees: (newItems: EmployeeDataResponse[]) =>
    set({
      employees: newItems,
      selectedUsers: [],
    }),
  toggleAll: (checked) => {
    const { employees: items } = get();
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
