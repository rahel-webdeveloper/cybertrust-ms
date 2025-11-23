import { sidebarNavTop } from '@/data/nav-data';
import type { LucideIcon } from 'lucide-react';
import { create } from 'zustand';

export interface SidebarItemsType {
  name: string;
  icon: LucideIcon;
  path: string;
  roles: string[];
}

interface SidebarState {
  isSidebarOpen: boolean;
  setSidebarState: (state: boolean) => void;
  role: string | undefined;
  filterSidebarItems: (role: string) => void;
  sideBarItems: SidebarItemsType[];
}

export const useSideBarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  sideBarItems: [],
  role: undefined,
  setSidebarState: (state) => {
    set({ isSidebarOpen: state });
  },
  filterSidebarItems: (role) => {
    const filteredSidebarItems = role
      ? sidebarNavTop.filter((item) => item.roles.includes(role))
      : [];

    set({ sideBarItems: filteredSidebarItems });
  },
}));
