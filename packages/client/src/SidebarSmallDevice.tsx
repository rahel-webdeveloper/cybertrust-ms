import { Flex, Icon } from '@chakra-ui/react';
import { PanelRight } from 'lucide-react';
import DrawerShell from './components/DrawerShell';
import type { SidebarItemsAndStatus } from './components/AppHeader';

const SidebarSmallDevice = ({
  sidebarStatus,
  sidebarItems,
}: SidebarItemsAndStatus) => {
  return (
    <Flex>
      <Icon
        display={{ base: 'none', md: 'block' }}
        cursor="pointer"
        _hover={{ opacity: 0.7 }}
        transition="opacity"
        onClick={sidebarStatus}
      >
        <PanelRight />
      </Icon>
      <DrawerShell sidebarItems={sidebarItems} />
    </Flex>
  );
};

export default SidebarSmallDevice;
