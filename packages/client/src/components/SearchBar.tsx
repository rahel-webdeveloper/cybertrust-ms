import { InputGroup, Input, Icon } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

const SearchLabel = () => {
  return (
    <InputGroup
      maxW="sm"
      startElement={
        <Icon size="md">
          <LuSearch />
        </Icon>
      }
      mx="3"
    >
      <Input placeholder="Search contacts" rounded="xl" />
    </InputGroup>
  );
};

export default SearchLabel;
