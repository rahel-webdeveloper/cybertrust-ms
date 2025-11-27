import { Button, CloseButton, Dialog, Icon, Portal } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddUserForm from './AddUserForm';
import PositionSelect from './PositionSelect';

const DialogAddUser = ({ isUserSelected }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState('');
  return (
    <Dialog.Root
      placement={'center'}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={{ base: 'sm', md: 'lg' }}
    >
      <Dialog.Trigger asChild>
        <Button variant="subtle" rounded="full" disabled={isUserSelected}>
          <Icon as={Plus} />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            backdropFilter={'blur(15px)'}
            bgColor={'transparent'}
            w="xl"
          >
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <AddUserForm positionValue={position}>
                <PositionSelect
                  onPositionChange={(position: string) => setPosition(position)}
                />
              </AddUserForm>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" rounded="full">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
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
export default DialogAddUser;
