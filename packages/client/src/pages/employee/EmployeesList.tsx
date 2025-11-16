import TableRow from '@/components/TableRow';
import { employeeColumns } from '@/data/table-data';
import { useTableSelectionStore } from '@/store/useTableSelectionStore';
import { Checkbox, Table } from '@chakra-ui/react';

const EmployeesList = () => {
  const items = useTableSelectionStore((state) => state.items);
  const selection = useTableSelectionStore((state) => state.selection);
  const toggleAll = useTableSelectionStore((state) => state.toggleAll);

  const indeterminate = selection.length > 0 && selection.length < items.length;

  return (
    <Table.Root maxW="dvw" overflowY={'auto'}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="6">
            <Checkbox.Root
              size="sm"
              mt="0.5"
              aria-label="Select all rows"
              checked={indeterminate ? 'indeterminate' : selection.length > 0}
              onCheckedChange={(changes) => {
                toggleAll(changes.checked as boolean);
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.ColumnHeader>
          {employeeColumns.map((col) => (
            <Table.ColumnHeader key={col.key}>{col.label}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TableRow items={items} />
      </Table.Body>
    </Table.Root>
  );
};

export default EmployeesList;
