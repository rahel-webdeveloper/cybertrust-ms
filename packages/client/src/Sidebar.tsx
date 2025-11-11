import { Button, Flex } from '@chakra-ui/react';
import DrawerShell from './components/DrawerShell';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  return (
    <Flex m="4" gap="2">
      <Button
        bg="red.600"
        variant="surface"
        onClick={() => {
          logout();
          navigate('/auth/login');
        }}
      >
        Logout
      </Button>
      <DrawerShell />
    </Flex>
  );
};

export default Sidebar;
