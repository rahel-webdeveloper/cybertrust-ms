import { Icon, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons/lib';
import NavLink from './ui/NavLink';

type NavItemProps = {
  icon: IconType;
  item: string;
  path: string;
};

const NavItem = ({ icon: NavIcon, item, path }: NavItemProps) => {
  return (
    <NavLink
      display="flex"
      alignItems="center"
      columnGap="5"
      py="2.5"
      px="4"
      borderRadius="2xl"
      cursor="pointer"
      // bg={isActive ? 'gray.900' : 'transparent'}
      // color={isActive ? 'whiteAlpha.950' : 'gray.300'}
      _hover={{ bg: 'gray.900' }}
      _focus={{ outline: 'none' }}
      to={path}
    >
      <Icon size="md">
        <NavIcon />
      </Icon>
      <Text as="span" fontWeight="medium" fontSize="sm">
        {item}
      </Text>
    </NavLink>
  );
};

export default NavItem;
