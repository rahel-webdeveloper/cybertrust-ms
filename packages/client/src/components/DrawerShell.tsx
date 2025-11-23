import { sidebarNavBottom } from '../data/nav-data';
import { CloseButton, Drawer, Grid, Portal, Stack } from '@chakra-ui/react';
import { useRef } from 'react';
import NavItem from './NavItem';
import { LogOut, PanelRightIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSideBarStore } from '@/store/sidebarStore';

const DrawerShell = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { logout } = useAuth();
  const filteredSidebarItems = useSideBarStore(
    (sidebar) => sidebar.sideBarItems
  );

  return (
    // We keep your working Ark UI structure:
    <Drawer.Root placement="start" initialFocusEl={() => ref.current}>
      <Drawer.Trigger
        display={{ base: 'block', md: 'none' }}
        asChild
        cursor="pointer"
        _hover={{ opacity: 0.7 }}
        transition="all"
      >
        <PanelRightIcon />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title fontSize="xl">CybeTrust</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              {/* Replaced generic p/Input with standard NavItems */}
              <Stack as="ul" ml={4} gap={2} mt="0">
                {filteredSidebarItems.map((item) => (
                  <NavItem
                    key={item.name}
                    navIcon={item.icon}
                    item={item.name}
                    path={item.path}
                  />
                ))}
              </Stack>
            </Drawer.Body>

            <Drawer.Footer justifyContent="normal">
              <Grid rowGap="2">
                {sidebarNavBottom.map((item) => (
                  <NavItem
                    key={item.name}
                    path={item.path}
                    navIcon={item.icon}
                    item={item.name}
                  />
                ))}
                <NavItem
                  navIcon={LogOut}
                  item={'Logout'}
                  path={'/auth/login'}
                  isSidebarOpen={false}
                  onClick={() => logout()}
                />
              </Grid>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerShell;
