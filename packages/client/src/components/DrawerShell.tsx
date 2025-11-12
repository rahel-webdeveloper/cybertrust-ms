import { navData } from '../data/cosnt-data';
import {
  Button,
  CloseButton,
  Drawer, // This is an object in your setup!
  Portal,
  Stack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';

const DrawerShell = () => {
  const [activeItem, setActiveItem] = useState('home');
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    // We keep your working Ark UI structure:
    <Drawer.Root placement="start" initialFocusEl={() => ref.current}>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Sidebar
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Sidebar Menu</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              {/* Replaced generic p/Input with standard NavItems */}
              <Stack ml={2} gap={2} mt="0">
                {navData.map((item, idx) => (
                  <Link to={item.path} key={idx}>
                    <NavItem
                      key={item.name}
                      icon={item.icon}
                      href={item.path}
                      isActive={activeItem === item.name}
                      onClick={() => setActiveItem(item.name)}
                    >
                      {item.name}
                    </NavItem>
                  </Link>
                ))}
              </Stack>
            </Drawer.Body>

            <Drawer.Footer>
              {/* Standard footer buttons */}
              <Button variant="outline" mr={3}>
                Cancel
              </Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerShell;
