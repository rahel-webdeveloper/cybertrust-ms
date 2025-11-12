import { HStack, Icon } from '@chakra-ui/react';
import { Bell } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';
import SearchLabel from './SearchBar';
import Sidebar from '@/Sidebar';

const AppHeader = () => {
  return (
    <HStack
      justifyContent="space-between"
      borderBottomWidth="1px"
      px={5}
      py={4}
    >
      <Sidebar />
      <SearchLabel />
      <HStack columnGap="4">
        <Icon _hover={{ opacity: 0.7 }} cursor="pointer" transition="opacity">
          <Bell />
        </Icon>
        <ProfileAvatar />
      </HStack>
    </HStack>
  );
};

export default AppHeader;
