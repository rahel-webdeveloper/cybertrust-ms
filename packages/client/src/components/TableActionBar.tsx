import { useEmployee } from '@/queries/employees';
import { useTableSelectionStore } from '@/store/tableSelectionStore';
import { Icon, HStack, IconButton, Flex } from '@chakra-ui/react';
import { Filter, RefreshCcw, SortAsc } from 'lucide-react';
import DialogAddUser from './DialogAddUser';
import { useAuth } from '@/context/AuthContext';
import DeleteUserConfirmDialog from './DeleteUserConfirmDialog';

const EmployeesTableActionBar = () => {
  const selectedUsers = useTableSelectionStore((state) => state.selectedUsers);
  const { refetch } = useEmployee();
  const { user } = useAuth();

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
        <DeleteUserConfirmDialog
          isUserSelected={Boolean(selectedUsers.length)}
          isUserAdmin={Boolean(user?.role !== 'admin')}
          refetchEmployee={refetch}
        />
        <DialogAddUser
          isUserSelected={Boolean(selectedUsers.length)}
          isUserAdmin={Boolean(user?.role !== 'admin')}
        />
      </Flex>
    </HStack>
  );
};

export default EmployeesTableActionBar;
