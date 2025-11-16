import { Box, Flex, Grid } from '@chakra-ui/react';
import { Outlet, useLoaderData } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import SidebarLargeDevice from './components/SidebarLargeDevice';
import { useState } from 'react';
import { sidebarNavTop } from './data/nav-data';
import type { LucideIcon } from 'lucide-react';

export type SidebarItemsType = {
  name: string;
  icon: LucideIcon;
  path: string;
  roles: string[];
};

function App() {
  const user = useLoaderData();
  const [openSidebar, setOpenSidebar] = useState(false);

  const filteredSidebarItems = sidebarNavTop.filter((item) =>
    item.roles.find((role) => role === user.role)
  );

  return (
    <Flex h="dvh" overflowX="auto" scrollbar={'hidden'}>
      <SidebarLargeDevice
        sidebarItems={filteredSidebarItems}
        isSidebarOpen={openSidebar}
      />

      <Grid flex="1" templateRows="auto 1fr">
        <AppHeader
          sidebarStatus={() => setOpenSidebar(!openSidebar)}
          sidebarItems={filteredSidebarItems}
        />

        <Box flex="1" p={4} mt="24">
          <Outlet />
        </Box>
      </Grid>
    </Flex>
  );
}

export default App;
