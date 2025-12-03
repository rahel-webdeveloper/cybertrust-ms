import EmployeesTableSkeleton from '@/components/EmployeesTableSkeleton';
import RoleMenu from '@/components/RoleMenu';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/queries/users';
import { useTableSelectionStore } from '@/store/tableSelectionStore';
import { Avatar, Badge, Checkbox, Table, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

const EmployeesTableBody = () => {
  const selection = useTableSelectionStore((state) => state.selectedUsers);
  const toggleItem = useTableSelectionStore((state) => state.toggleItem);
  const setItems = useTableSelectionStore((state) => state.setUsers);
  const users = useTableSelectionStore((state) => state.employees);

  const {
    data: employeesData,
    isRefetching,
    isLoading,
    refetch,
    error,
  } = useUser();
  const { user: loginUser } = useAuth();

  useEffect(() => {
    if (employeesData?.data) setItems(employeesData.data);
  }, [employeesData, setItems]);

  if (isLoading || isRefetching) return <EmployeesTableSkeleton />;

  if (error)
    return (
      <Text color={'fg.error'} position={'absolute'} fontSize={'md'} p="4">
        Faild to fetch employees
      </Text>
    );

  return (
    <Table.Body>
      {users.map((user, idx: number) => (
        <Table.Row
          key={idx}
          data-selected={selection.includes(user.email) ? '' : undefined}
        >
          <Table.Cell>
            <Checkbox.Root
              size="sm"
              mt="0.5"
              aria-label="Select row"
              checked={selection.includes(user.email)}
              onCheckedChange={() => toggleItem(user.email)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell display="flex" gap="3">
            <Avatar.Root shape="full" size="xs" cursor="pointer">
              <Avatar.Fallback fontSize="xs" name={user.name} />
              <Avatar.Image src={user.avatarUrl} />
            </Avatar.Root>
            {user.name}
          </Table.Cell>
          <Table.Cell>{user.department}</Table.Cell>
          <Table.Cell>
            {loginUser?.role === 'admin' ? (
              <RoleMenu
                refetch={refetch}
                userRole={user.role}
                userId={user._id}
              >
                <Badge
                  rounded="full"
                  variant="solid"
                  cursor="pointer"
                  colorPalette={
                    user.role === 'admin'
                      ? 'red'
                      : user.role === 'manager'
                      ? 'yellow'
                      : 'blue'
                  }
                  bgColor={
                    user.role === 'admin'
                      ? 'red.500'
                      : user.role === 'manager'
                      ? 'yellow.300'
                      : 'blue.500'
                  }
                >
                  {user.role}
                </Badge>
              </RoleMenu>
            ) : (
              <Badge
                rounded="full"
                variant="solid"
                colorPalette={
                  user.role === 'admin'
                    ? 'red'
                    : user.role === 'manager'
                    ? 'yellow'
                    : 'blue'
                }
                bgColor={
                  user.role === 'admin'
                    ? 'red.500'
                    : user.role === 'manager'
                    ? 'yellow.300'
                    : 'blue.500'
                }
              >
                {user.role}
              </Badge>
            )}
          </Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.country ?? 'Not Specified'}</Table.Cell>
          <Table.Cell>
            <Badge
              rounded="full"
              variant="subtle"
              color="black"
              bgColor={user.status === 'active' ? 'green.400' : 'border'}
            >
              {user.status}
            </Badge>
          </Table.Cell>
          <Table.Cell>${user.salary}</Table.Cell>
          <Table.Cell>
            {new Date(user.hireDate).toLocaleDateString()}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default EmployeesTableBody;
