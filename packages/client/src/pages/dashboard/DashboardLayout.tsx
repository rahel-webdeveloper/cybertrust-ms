import ActiveProjectsCard from '@/components/ActiveProjectsCard';
import CostsCard from '@/components/CostsCard';
import QuotaionsBars from '@/components/QuotationsBars';
import TasksStatusChart from '@/components/TasksStatusChart';
import TotalUserCard from '@/components/TotalUsersCard';
import { useQuotationFetch } from '@/queries/useQuotations';
import { Box, Flex, Spinner } from '@chakra-ui/react';

const DashboardLayout = () => {
  const { data: quotationData, isLoading, isRefetching } = useQuotationFetch();

  if (isRefetching || isLoading) return <Spinner size={'md'} />;

  return (
    <Flex gap="4" wrap={'wrap'}>
      <TotalUserCard />
      <CostsCard />
      <ActiveProjectsCard />
      <Box w="full" display={'grid'} gridTemplateColumns={{ md: '2fr 1fr' }}>
        <QuotaionsBars quotationData={quotationData} />
        <TasksStatusChart />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
