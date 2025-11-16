import { HStack, Icon } from '@chakra-ui/react';
import { Bell } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
import SearchLabel from './SearchBar';
import SidebarSmallDevice from '@/SidebarSmallDevice';
import { Tooltip } from './ui/tooltip';
import type { SidebarItemsType } from '@/App';

export type SidebarItemsAndStatus = {
  sidebarStatus?: () => void;
  sidebarItems: SidebarItemsType[];
};

const AppHeader = ({ sidebarStatus, sidebarItems }: SidebarItemsAndStatus) => {
  return (
    <HStack
      justifyContent="space-between"
      borderBottomWidth="1px"
      px={5}
      h="5rem"
      position="fixed"
      top="0"
      w={{ base: '100dvw', md: '93dvw' }}
      p={4}
      zIndex={1}
      backdropFilter="blur(15px)"
    >
      <SidebarSmallDevice
        sidebarItems={sidebarItems}
        sidebarStatus={sidebarStatus}
      />
      <SearchLabel />
      <HStack columnGap="4">
        <Tooltip
          content="You have no new notifications"
          contentProps={{ css: { '--tooltip-bg': 'colors.gray.300' } }}
          interactive
        >
          <Icon cursor="pointer" transition="opacity">
            <Bell />
          </Icon>
        </Tooltip>
        <ProfileAvatar />
      </HStack>
    </HStack>
  );
};

export default AppHeader;
