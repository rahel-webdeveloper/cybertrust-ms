import {
  AlignHorizontalDistributeCenter,
  CircleQuestionMark,
  DollarSign,
  FileText,
  Folders,
  Settings,
  User,
  UserCheck,
  Users,
  Waypoints,
} from 'lucide-react';

export const headerNav = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'Employees',
    path: '/employees',
    roles: ['admin'],
  },
  {
    name: 'Team',
    path: '/team',
    roles: ['manager', 'employee'],
  },
  {
    name: 'Projects',
    path: '/projects',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'Tasks',
    path: '/tasks',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'Quotations',
    path: '/quotations',
    roles: ['admin', 'manager'],
  },
  {
    name: 'Costs',
    path: '/costs',
    roles: ['admin', 'manager', 'employee'],
  },
];

export const sidebarNavTop = [
  // DASHBOARD - All roles
  {
    name: 'Dashboard',
    icon: AlignHorizontalDistributeCenter,
    path: 'dashboard',
    roles: ['admin', 'manager', 'employee'],
  },

  // EMPLOYEES - Admin full, Manager view only, Employee none
  {
    name: 'Employees',
    icon: Users,
    path: 'employees',
    roles: ['admin', 'manager'],
    subItems: [
      {
        name: 'All Employees',
        path: 'employees',
        roles: ['admin', 'manager'],
      },
      {
        name: 'Add Employee',
        path: 'employees/create',
        roles: ['admin'],
      },
      {
        name: 'Employee Reports',
        path: 'employees/reports',
        roles: ['admin'],
      },
    ],
  },

  // TEAM - Manager & Employee view (different from full Employees)
  {
    name: 'Team',
    icon: UserCheck,
    path: 'team',
    roles: ['manager', 'employee'],
  },

  // PROJECTS - All roles with different access
  {
    name: 'Projects',
    icon: Folders,
    path: 'projects',
    roles: ['admin', 'manager', 'employee'],
    subItems: [
      {
        name: 'All Projects',
        path: 'projects',
        roles: ['admin', 'manager', 'employee'],
      },
      {
        name: 'New Project',
        path: '/projects/create',
        roles: ['admin', 'manager'],
      },
      {
        name: 'Project Analytics',
        path: '/projects/analytics',
        roles: ['admin', 'manager'],
      },
    ],
  },

  // TASKS - All roles with different permissions
  {
    name: 'Tasks',
    icon: Waypoints,
    path: 'tasks',
    roles: ['admin', 'manager', 'employee'],
    subItems: [
      {
        name: 'All Tasks',
        path: '/tasks',
        roles: ['admin', 'manager', 'employee'],
      },
      {
        name: 'Assign Task',
        path: '/tasks/create',
        roles: ['admin', 'manager'],
      },
      {
        name: 'Task Status',
        path: '/tasks/status',
        roles: ['admin', 'manager', 'employee'],
      },
    ],
  },

  // QUOTATIONS - Admin & Manager only
  {
    name: 'Quotations',
    icon: FileText,
    path: 'quotations',
    roles: ['admin', 'manager'],
    subItems: [
      {
        name: 'All Quotes',
        path: '/quotations',
        roles: ['admin', 'manager'],
      },
      {
        name: 'Create Quote',
        path: '/quotations/create',
        roles: ['admin', 'manager'],
      },
      {
        name: 'Quote Analytics',
        path: '/quotations/analytics',
        roles: ['admin'],
      },
    ],
  },

  // COSTS - All roles
  {
    name: 'Costs',
    icon: DollarSign,
    path: 'costs',
    roles: ['admin', 'manager', 'employee'],
    subItems: [
      {
        name: 'All Costs',
        path: '/costs',
        roles: ['admin', 'manager', 'employee'],
      },
      {
        name: 'Log Cost',
        path: '/costs/create',
        roles: ['admin', 'manager', 'employee'],
      },
      {
        name: 'Cost Reports',
        path: '/costs/reports',
        roles: ['admin', 'manager'],
      },
    ],
  },
];

export const sidebarNavBottom = [
  // PROFILE - All roles
  {
    name: 'Settings',
    icon: Settings,
    path: 'settings',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'About',
    icon: CircleQuestionMark,
    path: 'about',
    roles: ['admin', 'manager', 'employee'],
  },
];

export const mobileTabs = [
  {
    name: 'Dashboard',
    icon: AlignHorizontalDistributeCenter,
    path: '/dashboard',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'Employees',
    icon: Users,
    path: '/employees',
    roles: ['admin'],
  },
  {
    name: 'Team',
    icon: UserCheck,
    path: '/team',
    roles: ['manager'],
  },
  {
    name: 'Projects',
    icon: Folders,
    path: '/projects',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'Tasks',
    icon: Waypoints,
    path: '/tasks',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'Costs',
    icon: DollarSign,
    path: '/costs',
    roles: ['admin', 'manager', 'employee'],
  },
  {
    name: 'Profile',
    icon: User,
    path: '/profile',
    roles: ['employee'],
  },
];
