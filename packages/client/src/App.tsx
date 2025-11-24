import { Box, Flex, Grid } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Loader from './components/Loader';
import { useEffect } from 'react';
import SidebarLargeDevice from './components/SidebarLargeDevice';
import AppHeader from './components/AppHeader';
import ErrorPage from './pages/ErrorPage';
import { useSideBarStore } from './store/sidebarStore';

function App() {
  const { user, isLoading, isError } = useAuth();
  const navigate = useNavigate();
  const filterSidebar = useSideBarStore(
    (sidebar) => sidebar.filterSidebarItems
  );

  useEffect(() => {
    if (!isError && !user && !isLoading)
      navigate('/auth/login', { replace: true });
  }, [navigate, user, isLoading, isError]);

  if (isLoading) return <Loader />;

  if (isError) return <ErrorPage />;

  if (user) filterSidebar(user.role);

  return (
    <Flex h="dvh" overflowX="auto">
      <SidebarLargeDevice />
      <Grid flex="1" templateRows="auto 1fr">
        <AppHeader />
        <Box flex="1" p={4}>
          <Outlet />
        </Box>
      </Grid>
    </Flex>
  );
}

export default App;
