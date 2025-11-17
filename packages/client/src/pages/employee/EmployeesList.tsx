import EmployeesActionBar from '@/components/TableActionBar';
import TableRows from '@/components/TableRows';
import { employeeColumns } from '@/data/table-data';
import { useTableSelectionStore } from '@/store/useTableSelectionStore';
import { Box, Checkbox, Table } from '@chakra-ui/react';

const EmployeesList = () => {
  const items = useTableSelectionStore((state) => state.items);
  const selection = useTableSelectionStore((state) => state.selection);
  const toggleAll = useTableSelectionStore((state) => state.toggleAll);
  const indeterminate = selection.length > 0 && selection.length < items.length;

  return (
    <Box maxW="100%" overflowX="auto" scrollbar="hidden">
      <EmployeesActionBar />
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
            {employeeColumns.map((col, idx) => (
              <Table.ColumnHeader key={idx}>{col.label}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <TableRows />
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default EmployeesList;
