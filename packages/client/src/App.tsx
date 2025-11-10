// In App.jsx

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Box, Flex } from '@chakra-ui/react';

function App() {
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
