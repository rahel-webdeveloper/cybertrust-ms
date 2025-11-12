import { Flex, Icon } from '@chakra-ui/react';
import DrawerShell from './components/DrawerShell';
import { PanelRight } from 'lucide-react';

export type OpenSidebarProps = {
  sidebarStatus: () => void;
};

const Sidebar = ({ sidebarStatus }: OpenSidebarProps) => {
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
      <DrawerShell />
    </Flex>
  );
};

export default Sidebar;
