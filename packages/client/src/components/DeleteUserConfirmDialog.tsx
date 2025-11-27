import { useDeleteUser } from '@/queries/users';
import { useTableSelectionStore } from '@/store/tableSelectionStore';
import { Button, CloseButton, Dialog, Icon, Portal } from '@chakra-ui/react';
import { Minus } from 'lucide-react';
import { useState } from 'react';
import { toaster } from './ui/toaster';

const DeleteUserConfirmDialog = ({
  isUserSelected,
  isUserAdmin,
  refetchEmployee,
}) => {
  const [open, setOpen] = useState(false);
  const selectedUsers = useTableSelectionStore((state) => state.selectedUsers);
  const { mutate } = useDeleteUser();

  const deleteUser = () => {
    const email = selectedUsers[0];

    if (selectedUsers.length > 1) {
      toaster.create({
        closable: true,
        type: 'error',
        title: 'Delete Faild',
        description: `Please select only one use and delete it.`,
      });
      return;
    }

    mutate(email, {
      onSuccess: () => {
        toaster.create({
          closable: true,
          duration: 5000,
          type: 'success',
          title: 'User Deleted',
          description: 'User deleted successfully',
        });
        refetchEmployee();
      },
      onError: (error) => {
        toaster.create({
          closable: true,
          type: 'error',
          title: 'Delete Faild',
          description: `Something went wrong. ${error.message}`,
        });
      },
    });
  };

  return (
    <Dialog.Root
      placement={'center'}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size="xs"
    >
      <Dialog.Trigger asChild>
        <Button
          ml="auto"
          variant="solid"
          rounded="full"
          colorPalette="red"
          disabled={!isUserSelected || isUserAdmin}
        >
          <Icon as={Minus} />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop backdropFilter={'blur(3px)'} />
        <Dialog.Positioner>
          <Dialog.Content
            backdropFilter={'blur(15px)'}
            rounded={'2xl'}
            bgColor={'transparent'}
            w="sm"
          >
            <Dialog.Header>
              <Dialog.Title>Deleting User</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Are you sure? This action cannot be undone.
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="solid" rounded="full" size={'xs'}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button
                variant="solid"
                colorPalette={'red'}
                rounded="full"
                size={'xs'}
                onClick={() => {
                  setOpen(false);
                  deleteUser();
                }}
              >
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default DeleteUserConfirmDialog;
