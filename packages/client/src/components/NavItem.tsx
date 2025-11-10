import { Box } from '@chakra-ui/react/box';

import type { ReactNode, MouseEventHandler } from 'react';

type NavItemProps = {
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  children: ReactNode;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  href?: string;
};

const NavItem = ({ icon: Icon, children, isActive, onClick }: NavItemProps) => (
  <Box
    as="li"
    display="flex"
    alignItems="center"
    p={2.5}
    pl={4}
    borderRadius="lg"
    cursor="pointer"
    bg={isActive ? 'gray.900' : 'transparent'}
    color={isActive ? 'whiteAlpha.950' : 'gray.300'}
    _hover={{ bg: 'gray.900' }}
    onClick={onClick}
    transition="background-color 0.2s"
  >
    {Icon && <Icon size={18} style={{ marginRight: '12px' }} />}
    <span style={{ fontWeight: '500' }}>{children}</span>
  </Box>
);

export default NavItem;
