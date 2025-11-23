import TopEmployeeCard from '@/components/TopEmployeeCard';
import { useEmployeesFetch, type User } from '@/queries/useEmplyees';
import { useTasksFetch } from '@/queries/useTasks';
import { Box, Spinner, Heading, Stack } from '@chakra-ui/react';

// or
type TaskCountMap = {
  [userId: string]: number;
};

type TopEmployee = User & {
  taskCount: number;
};

const TopEmployees = () => {
  const { data: tasks, isLoading: tasksLoading } = useTasksFetch();
  const { data: employees, isLoading: usersLoading } = useEmployeesFetch();

  if (tasksLoading || usersLoading) return <Spinner size={'lg'} />;

  const taskCount: TaskCountMap = tasks.data.reduce(
    (acc: TaskCountMap, task) => {
      acc[task.assigned[0]] = (acc[task.assigned] || 0) + 1;
      return acc;
    },
    {} as TaskCountMap
  );

  const topEmployees: TopEmployee[] = Object.entries(taskCount)
    .sort((a, b) => b[1] - a[1])
    .map(([userId, count]) => {
      const user = employees.data.find((user: User) => user._id === userId);

      return { ...user, taskCount: count };
    });

  return (
    <Box>
      <Heading mb={7} size={'2xl'}>
        Top Active Emloyees
      </Heading>
      <Stack
        display={{ base: 'flex', xl: 'grid' }}
        flexWrap={'wrap'}
        flexDir={'row'}
        gap={{ base: 6, xl: 10 }}
        justifyContent={'space-evenly'}
        gridTemplateColumns={{ md: '1fr 1fr ', lg: '1fr 1fr 1fr' }}
      >
        {topEmployees.map((employee, idx) => (
          <TopEmployeeCard key={idx} employee={employee} />
        ))}
      </Stack>
    </Box>
  );
};

export default TopEmployees;
