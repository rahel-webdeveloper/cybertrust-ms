import { Box, Flex, Grid, Spinner } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './Sidebar';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Grid placeItems="center" h="dvh">
        <Spinner size="xl" textAlign="center"></Spinner>
      </Grid>
    );
  }

  return (
    <Flex direction="column">
      <Sidebar />
      <Box flex="1" p={4} border={'red'}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;
