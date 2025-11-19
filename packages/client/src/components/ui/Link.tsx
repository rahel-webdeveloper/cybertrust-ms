import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { forwardRef, type ReactNode } from 'react';

type LinkProps = Omit<ChakraLinkProps, 'to'> &
  RouterLinkProps & {
    children: ReactNode;
  };

// Use forwardRef for maximum compatibility and clean code
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, ...props }, ref) => {
    return (
      <ChakraLink
        as={RouterLink} // RouterLink is rendered under the hood
        ref={ref}
        _focus={{ outline: 'none' }}
        {...({ to, ...props } as unknown as ChakraLinkProps & RouterLinkProps)} // pass both Chakra and Router props
      >
        {children}
      </ChakraLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
