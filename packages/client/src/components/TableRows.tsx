import { useTableSelectionStore } from '@/store/useTableSelectionStore';
import { Checkbox, Table } from '@chakra-ui/react';

type EmployeeType = {
  id: number;
  name: string;
  category: string;
  price: number;
};

type TableRowProps = {
  items: EmployeeType[];
};

const TableRow = ({ items }: TableRowProps) => {
  const selection = useTableSelectionStore((state) => state.selection);
  const toggleItme = useTableSelectionStore((state) => state.toggleItem);

  return (
    <>
      {items.map((item) => (
        <Table.Row
          key={item.name}
          data-selected={selection.includes(item.name) ? '' : undefined}
        >
          <Table.Cell>
            <Checkbox.Root
              size="sm"
              mt="0.5"
              aria-label="Select row"
              checked={selection.includes(item.name)}
              onCheckedChange={() => toggleItme(item.name)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
          </Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.category}</Table.Cell>
          <Table.Cell>${item.price}</Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default TableRow;
