import { Box, Flex, Grid } from '@chakra-ui/react';
import { Outlet, useLoaderData } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import SidebarLargeDevice from './components/SidebarLargeDevice';
import { useState } from 'react';
import { sidebarNav } from './data/cosnt-data';
import type { LucideIcon } from 'lucide-react';

export type SidebarItemsType = {
  name: string;
  icon: LucideIcon;
  path: string;
  roles: string[];
};

function App() {
  const user = useLoaderData();

  const filteredSidebarItems = sidebarNav.filter((item) =>
    item.roles.find((role) => role === user.role)
  );

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Flex h="dvh" overflowX="auto">
      <SidebarLargeDevice
        sidebarItems={filteredSidebarItems}
        isSidebarOpen={openSidebar}
      />

      <Grid flex="1" templateRows="auto 1fr">
        <AppHeader
          sidebarStatus={() => setOpenSidebar(!openSidebar)}
          sidebarItems={filteredSidebarItems}
        />

        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Grid>
    </Flex>
  );
}

export default App;
