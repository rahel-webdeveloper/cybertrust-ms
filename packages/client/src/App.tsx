// In App.jsx

import { Box, Button, Flex, Spinner } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Sidebar from './Sidebar';

function App() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  if (isLoading) {
    return <Spinner size="xl">Loading...</Spinner>;
  }

  return (
    <Flex direction="column">
      <Sidebar />
      <Box flex="1" p={4} border={'red'}>
        <Button
          variant="surface"
          bg="red.600"
          onClick={() => {
            logout();
            navigate('/auth/login');
          }}
        >
          Log Out
        </Button>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default App;
