import { Box, Flex, Grid } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
// ... other imports ...
import { useAuth } from './context/AuthContext';
import Loader from './components/Loader';
import { useEffect, useState } from 'react';
import { sidebarNavTop } from './data/nav-data';
import SidebarLargeDevice from './components/SidebarLargeDevice';
import AppHeader from './components/AppHeader';
import ErrorPage from './pages/ErrorPage';

function App() {
  const { user, isLoading, isError, logout, error } = useAuth();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    if (!isError && !user && !isLoading) {
      logout();
      navigate('/auth/login', { replace: true });
    }
  }, [navigate, user, isLoading, isError, logout]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage message={error?.message} />;

  const filteredSidebarItems = user
    ? sidebarNavTop.filter((item) => item.roles.includes(user.role))
    : [];

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
