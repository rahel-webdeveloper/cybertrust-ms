import { Box, Flex, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import SidebarShell from './components/SidebarShell';
import { useState } from 'react';

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Flex h="dvh" overflowX="auto">
      <SidebarShell isSidebarOpen={openSidebar} />
      <Grid flex="1" templateRows="auto 1fr">
        <AppHeader sidebarStatus={() => setOpenSidebar(!openSidebar)} />

        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Grid>
    </Flex>
  );
}

export default App;
