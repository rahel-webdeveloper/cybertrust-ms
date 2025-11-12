import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import {
  NavLink as RouterLink,
  type NavLinkProps as RouterNavLinkProps,
} from 'react-router-dom';
import { forwardRef, type ReactNode } from 'react';

type LinkProps = Omit<ChakraLinkProps, 'to'> &
  RouterNavLinkProps & {
    children: ReactNode;
  };

// Use forwardRef for maximum compatibility and clean code
const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, ...props }, ref) => {
    return (
      <ChakraLink
        as={RouterLink} // RouterLink is rendered under the hood
        ref={ref}
        {...({ to, ...props } as unknown as ChakraLinkProps &
          RouterNavLinkProps)} // pass both Chakra and Router props
      >
        {children}
      </ChakraLink>
    );
  }
);

NavLink.displayName = 'NavLink';

export default NavLink;
