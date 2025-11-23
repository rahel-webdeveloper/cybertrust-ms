import { HStack, Icon } from '@chakra-ui/react';
import { Bell } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
import SearchLabel from './SearchBar';
import SidebarSmallDevice from '@/SidebarSmallDevice';
import { Tooltip } from './ui/tooltip';

const AppHeader = () => {
  return (
    <HStack
      justifyContent="space-between"
      borderBottomWidth="1px"
      px={5}
      h="5rem"
      position="sticky"
      top="0"
      p={4}
      zIndex={1}
      backdropFilter="blur(15px)"
    >
      <SidebarSmallDevice />
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
