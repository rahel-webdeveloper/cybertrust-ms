import { Avatar, Badge, Box, Flex, HStack, Text } from '@chakra-ui/react';

const taskCountColor = (count: number) => {
  if (count >= 6) return 'green.300';
  else if (count >= 5) return 'purple.300';
  else if (count > 3) return 'blue.300';
  else if (count > 2) return 'yellow.300';
  else return 'red.300';
};

const TopEmployeeItem = ({ employee }) => {
  return (
    <Box p={4} borderBottomWidth={'1px'} key={employee.name}>
      <Flex align="center" justify={'space-between'}>
        <Flex gap="2">
          <Avatar.Root>
            <Avatar.Fallback name={employee.name} />
            <Avatar.Image src={employee.avatarUrl} />
          </Avatar.Root>

          <Box>
            <Text fontWeight="medium" fontSize={'xs'}>
              {employee.name.slice(0, 12)}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {employee.email}
            </Text>
          </Box>
        </Flex>

        <HStack>
          <Badge
            rounded={'full'}
            // colorPalette={'purple'}
            color="gray.900"
            bgColor={taskCountColor(employee.taskCount)}
            variant={'subtle'}
            px="3"
            // py="1"
            mt={2}
          >
            {employee.taskCount}
          </Badge>
        </HStack>

        <Text colorScheme="blue" fontWeight={'medium'} fontSize={'xs'} mt={2}>
          {new Date(employee.hireDate).toLocaleDateString()}
        </Text>
      </Flex>
    </Box>
  );
};

export default TopEmployeeItem;
