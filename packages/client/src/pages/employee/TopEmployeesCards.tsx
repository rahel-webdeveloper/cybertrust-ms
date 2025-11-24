import TopEmployeeCard from '@/components/TopEmployeeCard';
import { useTopEmployee } from '@/queries/employees';
import { Box, Heading, Spinner, Stack } from '@chakra-ui/react';

export type TopEmployeeType = {
  department: string;
  email: string;
  employeeId: string;
  hireDate: string;
  name: string;
  phone: string;
  position: string;
  avatarUrl: string;
  role: string;
  salary: number;
  taskCount: number;
};

const TopEmployeesCardsDiv = () => {
  const { data: topEmployeeData, isLoading, isRefetching } = useTopEmployee();

  if (isLoading || isRefetching) return <Spinner size={'lg'} />;

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
        {topEmployeeData.data.map((employee: TopEmployeeType, idx: number) => (
          <TopEmployeeCard key={idx} employee={employee} />
        ))}
      </Stack>
    </Box>
  );
};

export default TopEmployeesCardsDiv;
