import { useEmployee } from '@/queries/employees';
import { useTableSelectionStore } from '@/store/tableSelectionStore';
import { Button, Icon, HStack, IconButton, Flex } from '@chakra-ui/react';
import { Filter, Minus, Plus, RefreshCcw, SortAsc } from 'lucide-react';

const EmployeesTableActionBar = () => {
  const selection = useTableSelectionStore((state) => state.selection);
  const { refetch } = useEmployee();

  return (
    <HStack mb="5" justify={'space-between'} p="2">
      <Flex gap="2">
        <IconButton variant={'subtle'} rounded="full">
          <Icon as={Filter} />
        </IconButton>
        <IconButton variant={'subtle'} rounded="full">
          <Icon as={SortAsc} />
        </IconButton>
        <IconButton onClick={() => refetch()} variant={'subtle'} rounded="full">
          <Icon as={RefreshCcw} />
        </IconButton>
      </Flex>
      <Flex gap="3">
        <Button
          ml="auto"
          variant="subtle"
          rounded="full"
          colorPalette="red"
          disabled={Boolean(!selection.length)}
        >
          <Icon as={Minus} />
        </Button>
        <Button
          variant="subtle"
          rounded="full"
          disabled={Boolean(selection.length)}
        >
          <Icon as={Plus} />
        </Button>
      </Flex>
    </HStack>
  );
};

export default EmployeesTableActionBar;
