import { Avatar, Box, Skeleton, Table } from '@chakra-ui/react';

const EmployeesTableSkeleton = () => {
  return (
    <Box position={'absolute'}>
      {Array.from({ length: 7 }).map(() => (
        <Table.Row
          display="flex"
          alignItems="center"
          justifyContent={'space-between'}
          w="85%"
          borderBottomWidth="1px"
          gap={2}
        >
          <Table.Cell w="6">
            <Skeleton height="20px" width="20px" />
          </Table.Cell>

          {/* Name and Avatar Cell */}
          <Table.Cell flex="2" display="flex" gap="3" alignItems="center">
            <Skeleton rounded={'full'}>
              <Avatar.Root />
            </Skeleton>
            <Skeleton height="16px" width="120px" />
          </Table.Cell>

          {/* Department Cell */}
          <Table.Cell flex="1">
            <Skeleton height="16px" width="80px" />
          </Table.Cell>

          {/* Role Badge Cell */}
          <Table.Cell flex="1">
            <Skeleton height="20px" width="70px" rounded="full" />
          </Table.Cell>

          {/* Email Cell */}
          <Table.Cell flex="2">
            <Skeleton height="16px" width="150px" />
          </Table.Cell>

          <Table.Cell flex="1">
            <Skeleton height="16px" width="60px" />
          </Table.Cell>

          <Table.Cell flex="1">
            <Skeleton height="20px" width="70px" rounded="full" />
          </Table.Cell>

          <Table.Cell flex="1">
            <Skeleton height="16px" width="50px" />
          </Table.Cell>

          <Table.Cell flex="1">
            <Skeleton height="16px" width="90px" />
          </Table.Cell>
        </Table.Row>
      ))}
    </Box>
  );
};

export default EmployeesTableSkeleton;
