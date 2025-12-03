import Link from '@/components/ui/Link';
import { employeeColumns } from '@/data/table-data';
import { useTableSelectionStore } from '@/store/tableSelectionStore';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  HStack,
  Table,
  Text,
} from '@chakra-ui/react';
import EmployeesTableBody from './EmployeesTableBody';
import EmployeesTableActionBar from '@/components/TableActionBar';

const EmployeesTable = () => {
  const items = useTableSelectionStore((state) => state.employees);
  const selection = useTableSelectionStore((state) => state.selectedUsers);
  const toggleAll = useTableSelectionStore((state) => state.toggleAll);
  const indeterminate = selection.length > 0 && selection.length < items.length;

  return (
    <Box w="full" overflowX="auto" scrollbar="hidden">
      <EmployeesTableActionBar />
      <HStack justify="space-between" alignItems={'center'}>
        <Link to={'top-employees'} mb={5}>
          <Button variant={'subtle'} rounded={'2xl'} fontWeight={'semibold'}>
            Find Top Employees
          </Button>
        </Link>
        <Text fontWeight={'semibold'}>
          Total Employees/Admin
          <Badge rounded="full" variant="subtle" size={'lg'} ml={'2'}>
            {items.length}
          </Badge>
        </Text>
      </HStack>
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
        <EmployeesTableBody />
      </Table.Root>
    </Box>
  );
};

export default EmployeesTable;
