import { navData } from '../data/cosnt-data';
import { Button, CloseButton, Drawer, Portal, Stack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
import { Columns2 } from 'lucide-react';

const DrawerShell = () => {
  const [activeItem, setActiveItem] = useState('home');
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    // We keep your working Ark UI structure:
    <Drawer.Root placement="start" initialFocusEl={() => ref.current}>
      <Drawer.Trigger
        asChild
        ml={2}
        cursor="pointer"
        color="gray.300"
        _hover={{ opacity: 0.7 }}
        transition="all"
      >
        <Columns2 />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>CyberTrust</Drawer.Title>
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
