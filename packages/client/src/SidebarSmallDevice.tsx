import { Flex, Icon } from '@chakra-ui/react';
import { PanelRight } from 'lucide-react';
import DrawerShell from './components/DrawerShell';

import { useSideBarStore } from './store/sidebarStore';

const SidebarSmallDevice = () => {
  const setSidebarState = useSideBarStore((e) => e.setSidebarState);
  const isSidebarState = useSideBarStore((state) => state.isSidebarOpen);

  return (
    <Flex>
      <Icon
        display={{ base: 'none', md: 'block' }}
        cursor="pointer"
        _hover={{ opacity: 0.7 }}
        transition="opacity"
        onClick={() => setSidebarState(!isSidebarState)}
      >
        <PanelRight />
      </Icon>
      <DrawerShell />
    </Flex>
  );
};

export default SidebarSmallDevice;
