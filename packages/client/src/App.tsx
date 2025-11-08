import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import { Button, Icon } from '@chakra-ui/react';
import { HiHeart } from 'react-icons/hi';

function App() {
  return (
    <div>
      <Sidebar />
      <div>
        <Button size="xs">Click me</Button>
        <Icon>
          <HiHeart />
        </Icon>

        <Outlet />
      </div>
    </div>
  );
}

export default App;
