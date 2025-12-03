/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserRole } from '@/queries/users';
import { Icon, Menu, Portal } from '@chakra-ui/react';
import { Ellipsis } from 'lucide-react';
import { type ReactNode } from 'react';
import { toaster } from './ui/toaster';
import type { QueryObserverResult } from '@tanstack/react-query';

const items = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Developer', value: 'developer' },
];

type RoleMenuProps = {
  userRole: string;
  userId: string;
  children?: ReactNode;
  refetch: () => Promise<QueryObserverResult<any, Error>>;
};

const RoleMenu = ({ userRole, userId, children, refetch }: RoleMenuProps) => {
  const { mutate } = useUserRole();

  const handleRole = (e: any) => {
    mutate(
      { newRole: e.value, id: userId },
      {
        onSuccess: () => {
          toaster.create({
            type: 'success',
            description: 'User role has changed',
          });
          refetch();
        },
        onError: () => {
          toaster.create({
            type: 'error',
            title: 'Changing Role Faild',
            description: 'Changing user role faild please try again',
          });
        },
      }
    );
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        {children ? (
          children
        ) : (
          <Icon
            cursor={'pointer'}
            as={Ellipsis}
            alignSelf={'start'}
            ml="auto"
          />
        )}
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            boxShadow={'xs'}
            backdropFilter={'blur(15px)'}
            rounded={'2xl'}
            bgColor={'transparent'}
          >
            <Menu.RadioItemGroup value={userRole} onValueChange={handleRole}>
              {items.map((item) => (
                <Menu.RadioItem
                  key={item.value}
                  value={item.value}
                  rounded={'3xl'}
                  bgColor={{ _hover: 'gray.950/40' }}
                >
                  {item.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default RoleMenu;
