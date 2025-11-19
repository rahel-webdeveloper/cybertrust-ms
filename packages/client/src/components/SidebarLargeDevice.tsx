import { Box, Stack, Text, VStack } from '@chakra-ui/react';
import NavItem from './NavItem';
import { sidebarNavBottom } from '@/data/nav-data';
import type { SidebarItemsType } from '@/App';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type LargeSidebarProps = {
  isSidebarOpen: boolean;
  sidebarItems: SidebarItemsType[];
};

const SidebarLargeDevice = ({
  isSidebarOpen,
  sidebarItems,
}: LargeSidebarProps) => {
  const { logout } = useAuth();

  return (
    <VStack
      data-state="open"
      _open={{
        animationName: 'fade-in, scale-in',
        animationDuration: '300ms',
      }}
      display={{ base: 'none', md: 'flex' }}
      justifyContent="space-between"
      borderRightWidth="1px"
      as="aside"
      position="sticky"
      top="0"
      h="full"
      p={4}
      w={isSidebarOpen ? '15rem' : '5rem'}
      transitionProperty="width"
      transitionDuration="moderate"
      transitionTimingFunction="ease-in-out"
      overflowX="hidden"
      overflowY="auto"
      scrollbar={'hidden'}
    >
      <Box w="full">
        <Text
          fontSize="lg"
          fontWeight="600"
          letterSpacing={!isSidebarOpen ? 'widest' : 'wide'}
          textAlign="center"
          bg="teal.700"
          rounded="xl"
          w="min-content"
          px="2.5"
          mx="auto"
          mt="2"
          cursor="pointer"
        >
          {isSidebarOpen ? 'CYBERTRUST' : 'CT'}
        </Text>

        <Stack rowGap={2} mt="8">
          {sidebarItems.map((item) => (
            <NavItem
              key={item.name}
              navIcon={item.icon}
              item={item.name}
              path={item.path}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </Stack>
      </Box>

      <Stack rowGap="2" w="full">
        {sidebarNavBottom.map((item) => (
          <NavItem
            key={item.name}
            navIcon={item.icon}
            path={item.path}
            item={item.name}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
        <NavItem
          navIcon={LogOut}
          item={'Logout'}
          path={'/auth/login'}
          onClick={() => logout()}
          isSidebarOpen={isSidebarOpen}
        />
      </Stack>
    </VStack>
  );
};

export default SidebarLargeDevice;
