import type { LucideIcon } from 'lucide-react';
import NavLink from './ui/NavLink';
import NavItemContent from './NavItemContent';

type NavItemProps = {
  navIcon: LucideIcon;
  item: string;
  path: string;
  isSidebarOpen?: boolean;
};

const NavItem = ({ navIcon, item, path, isSidebarOpen }: NavItemProps) => {
  return (
    <NavLink
      display="flex"
      alignItems="center"
      columnGap="5"
      py="2.5"
      px="3.5"
      borderRadius="2xl"
      cursor="pointer"
      style={({ isActive }) => ({
        backgroundColor: isActive ? '#18181B' : '',
        color: isActive ? '#e8e8ecff' : '',
      })}
      _hover={{ bg: 'gray.900', color: '#e8e8ecff' }}
      _focus={{ outline: 'none' }}
      to={path}
    >
      <NavItemContent
        item={item}
        navIcon={navIcon}
        isSidebarOpen={isSidebarOpen}
      />
    </NavLink>
  );
};

export default NavItem;
