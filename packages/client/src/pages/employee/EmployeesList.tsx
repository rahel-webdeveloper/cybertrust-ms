import TableRows from '@/components/TableRows';
import { employeeColumns } from '@/data/table-data';
import { useEmployeesList } from '@/queries/useEmplyeesList';
import { useTableSelectionStore } from '@/store/useTableSelectionStore';
import { Alert, Box, Checkbox, Spinner, Table } from '@chakra-ui/react';

const EmployeesList = () => {
  const items = useTableSelectionStore((state) => state.items);
  const selection = useTableSelectionStore((state) => state.selection);
  const toggleAll = useTableSelectionStore((state) => state.toggleAll);

  const indeterminate = selection.length > 0 && selection.length < items.length;

  const { data, isLoading, error } = useEmployeesList();

  if (isLoading) return <Spinner mt="7" size="md" />;

  if (error) return <Alert.Description>{error?.message}</Alert.Description>;

  return (
    <Box maxW="100%" overflowX="auto" scrollbar="hidden">
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
          <TableRows items={data.data} />
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default EmployeesList;
