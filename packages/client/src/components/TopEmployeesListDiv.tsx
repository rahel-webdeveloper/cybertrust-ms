import { useTopEmployee } from '@/queries/employees';
import { Stack, Button, Text, Icon, Box } from '@chakra-ui/react';
import { Dumbbell } from 'lucide-react';
import TopActiveEmployeesSkeleton from './TopEmployeesListSkeleton';
import TopEmployeesList from './TopEmployeeItem';
import Link from './ui/Link';
import type { TopEmployeeType } from '@/pages/employee/TopEmployeesCards';

const TopEmployeesListDiv = () => {
  const { data: topEmployees, isLoading, isRefetching } = useTopEmployee();

  if (isLoading || isRefetching) return <TopActiveEmployeesSkeleton />;

  return (
    <Stack borderWidth="1px" borderRadius="xl" position={'relative'}>
      <Text
        fontSize={'xl'}
        m="5"
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
        {topEmployees.data
          .slice(0, 5)
          .map((employee: TopEmployeeType, idx: number) => (
            <TopEmployeesList key={idx} employee={employee} />
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
          <Link to={'/app/employees/top-employees'}>Show more..</Link>
        </Button>
      </Stack>
    </Stack>
  );
};

export default TopEmployeesListDiv;
