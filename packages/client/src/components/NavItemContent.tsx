import { Box, Icon, Text, useBreakpointValue } from '@chakra-ui/react';
import type { LucideIcon } from 'lucide-react';
import { Tooltip } from './ui/tooltip';

const NavItemContent = ({
  item,
  navIcon,
  isSidebarOpen,
}: {
  isSidebarOpen?: boolean;
  item: string;
  navIcon: LucideIcon;
}) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const showLabel = !isDesktop || isSidebarOpen;
  const showTooltip = isDesktop && !isSidebarOpen;

  return (
    <>
      {showTooltip ? (
        <Tooltip
          positioning={{ placement: 'right-end' }}
          immediate={true}
          content={item}
          interactive
        >
          <Icon as={navIcon} boxSize={5} />
        </Tooltip>
      ) : (
        <Icon as={navIcon} boxSize={5} />
      )}

      {showLabel && (
        <Box transition="opacity 0.2s ease-in-out" opacity={showLabel ? 1 : 0}>
          <Text as="span" fontWeight="medium" fontSize="sm">
            {item}
          </Text>
        </Box>
      )}
    </>
  );
};

export default NavItemContent;
