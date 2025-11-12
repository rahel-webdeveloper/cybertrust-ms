import { Box, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <Grid direction="column">
      <AppHeader />
      <Box flex="1" p={4} border={'red'}>
        <Outlet />
      </Box>
    </Grid>
  );
}

export default App;
