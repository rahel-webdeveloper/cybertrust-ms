import { Icon, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons/lib';
import NavLink from './ui/NavLink';
import { useState, useEffect } from 'react';
import { Tooltip } from './ui/tooltip';

type NavItemProps = {
  icon: IconType;
  item: string;
  path: string;
  isSidebarOpen?: boolean;
};

const NavItem = ({
  icon: NavIcon,
  item,
  path,
  isSidebarOpen,
}: NavItemProps) => {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => setSize(window.innerWidth), [window.innerWidth]);

  return (
    <NavLink
      display="flex"
      alignItems="center"
      columnGap={!isSidebarOpen && size >= 768 ? '8' : '4'}
      p="0.83rem"
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
      <Tooltip
        positioning={{ placement: 'right-end' }}
        showArrow
        content={item}
        interactive
      >
        <Icon size="md">
          <NavIcon />
        </Icon>
      </Tooltip>
      <Text as="span" fontWeight="medium" fontSize="sm">
        {item}
      </Text>
    </NavLink>
  );
};

export default NavItem;
