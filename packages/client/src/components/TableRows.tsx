import { useEmployeesList } from '@/queries/useEmplyeesList';
import { useTableSelectionStore } from '@/store/useTableSelectionStore';
import { Avatar, Badge, Checkbox, Spinner, Table } from '@chakra-ui/react';
import { useEffect } from 'react';

const TableRows = () => {
  const selection = useTableSelectionStore((state) => state.selection);
  const toggleItem = useTableSelectionStore((state) => state.toggleItem);
  const setItems = useTableSelectionStore((state) => state.setItems);
  const items = useTableSelectionStore((state) => state.items);

  const { data: employeesData, isLoading, error } = useEmployeesList();

  useEffect(() => {
    if (employeesData?.data) setItems(employeesData.data);
  }, [employeesData, setItems]);

  if (isLoading) return <Spinner mt="7" size="md" />;

  if (error) return;

  return (
    <>
      {items.map((item, idx: number) => (
        <Table.Row
          key={idx}
          data-selected={selection.includes(item.user.email) ? '' : undefined}
        >
          <Table.Cell>
            <Checkbox.Root
              size="sm"
              mt="0.5"
              aria-label="Select row"
              checked={selection.includes(item.user.email)}
              onCheckedChange={() => toggleItem(item.user.email)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell display="flex" gap="3">
            <Avatar.Root shape="full" size="xs" cursor="pointer">
              <Avatar.Fallback fontSize="xs" name={item.user.name} />
              <Avatar.Image src={item.user.profile.avatarUrl} />
            </Avatar.Root>
            {item.user.name}
          </Table.Cell>
          <Table.Cell>{item.department}</Table.Cell>
          <Table.Cell>
            <Badge
              rounded="full"
              variant="subtle"
              colorPalette={item.user.role === 'manager' ? 'teal' : 'yellow'}
            >
              {item.user.role}
            </Badge>
          </Table.Cell>
          <Table.Cell>{item.user.email}</Table.Cell>
          <Table.Cell>{item.user.profile.country}</Table.Cell>
          <Table.Cell>
            <Badge
              rounded="full"
              variant="subtle"
              colorPalette={item.user.status === 'active' ? 'green' : 'border'}
            >
              {item.user.status}
            </Badge>
          </Table.Cell>
          <Table.Cell>
            {new Date(item.hireDate).toLocaleDateString()}
          </Table.Cell>
          <Table.Cell>${item.salary}</Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableRows;
