import { useEmployeesFetch } from '@/queries/useEmplyees';
import { useTasksFetch } from '@/queries/useTasks';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Dumbbell } from 'lucide-react';
import Link from './ui/Link';

const taskCountColor = (count: number) => {
  if (count >= 6) return 'green.300';
  else if (count >= 5) return 'purple.300';
  else if (count > 3) return 'red.300';
  else return 'blue.300';
};

const ActiveUsers = () => {
  const { data: tasks, isLoading: tasksLoading } = useTasksFetch();
  const { data: employees, isLoading: usersLoading } = useEmployeesFetch();

  if (tasksLoading || usersLoading) return;

  const taskCount: [number] = tasks.data.reduce((acc, task) => {
    acc[task.assigned[0]] = (acc[task.assigned] || 0) + 1;
    return acc;
  }, {});

  const topEmployees = Object.entries(taskCount)
    .sort((a, b) => b[1] - a[1])
    .map(([userId, count]) => {
      const user = employees.data.find((user: User) => user._id === userId);

      return { ...user, taskCount: count };
    });

  return (
    <Stack borderWidth="1px" borderRadius="xl" position={'relative'}>
      <Text
        fontSize={'xl'}
        m="5"
        // marginBottom={'0'}
        // mx=""
        fontWeight={'600'}
        display={'flex'}
        gap={'3'}
        alignItems={'center'}
        alignSelf={'center'}
      >
        <Icon as={Dumbbell} color="cyan.400" size={'xl'} />
        Top Active Employees
      </Text>
      <Box mx={'4'} mt={'0'} mb="10">
        {topEmployees.slice(0, 5).map((employee) => (
          <Box p={4} borderBottomWidth={'1px'} key={employee._id}>
            <Flex align="center" justify={'space-between'}>
              <Flex gap="2">
                <Avatar.Root>
                  <Avatar.Fallback name={employee.user.name} />
                  <Avatar.Image src={employee.user.profile.avatarUrl} />
                </Avatar.Root>

                <Box>
                  <Text fontWeight="medium" fontSize={'xs'}>
                    {employee.user.name.slice(0, 12)}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {employee.user.email}
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

              <Text
                colorScheme="blue"
                fontWeight={'medium'}
                fontSize={'xs'}
                mt={2}
              >
                {new Date(employee.hireDate).toLocaleDateString()}
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>
      <Stack
        position={'absolute'}
        rounded={'xl'}
        w="full"
        h="45%"
        bottom={'0'}
        bgGradient="to-b"
        gradientFrom="transparent"
        gradientTo="whiteAlpha.500"
      >
        <Button
          mx="auto"
          mt={'auto'}
          mb="8"
          px="6"
          rounded={'full'}
          variant={'surface'}
        >
          <Link to={'/app/employees'}>Show more..</Link>
        </Button>
      </Stack>
    </Stack>
  );
};

export default ActiveUsers;
