import type { EmployeeDataResponse } from '@/queries/useEmplyeesList';
import { useTableSelectionStore } from '@/store/useTableSelectionStore';
import { Avatar, Checkbox, Table } from '@chakra-ui/react';

type TableRowProps = {
  items: EmployeeDataResponse[];
};

const TableRows = ({ items }: TableRowProps) => {
  const selection = useTableSelectionStore((state) => state.selection);
  const toggleItme = useTableSelectionStore((state) => state.toggleItem);

  return (
    <>
      {items.map((item, idx) => (
        <Table.Row
          key={idx}
          data-selected={selection.includes(item.department) ? '' : undefined}
        >
          <Table.Cell>
            <Checkbox.Root
              size="sm"
              mt="0.5"
              aria-label="Select row"
              checked={selection.includes(item.department)}
              onCheckedChange={() => toggleItme(item.department)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell display="flex" gap="3">
            <Avatar.Root shape="full" size="xs" cursor="pointer">
              <Avatar.Fallback fontSize="xs" name={item.user!.name} />
              <Avatar.Image src={item.user.avatarUrl} />
            </Avatar.Root>
            {item.user.name}
          </Table.Cell>
          <Table.Cell>{item.department}</Table.Cell>
          <Table.Cell>{item.user.role}</Table.Cell>
          <Table.Cell>{item.user.email}</Table.Cell>
          <Table.Cell>{item.user.country}</Table.Cell>
          <Table.Cell>
            {new Date(item!.hireDate).toLocaleDateString()}
          </Table.Cell>
          <Table.Cell>${item.salary}</Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableRows;
