import ActiveProjectsCard from '@/components/ActiveProjectsCard';
import CostsCard from '@/components/CostsCard';
import Loader from '@/components/Loader';
import QuotaionsBars from '@/components/QuotationsBars';
import TopEmployeesList from '@/components/ToEmployeesList';
import TotalUserCard from '@/components/UsersCard';
import { useQuotation } from '@/queries/quotations';
import { Box, Flex } from '@chakra-ui/react';

const DashboardLayout = () => {
  const { data: quotationData, isLoading, isRefetching } = useQuotation();

  if (isRefetching || isLoading) return <Loader />;

  return (
    <Flex gap="4" wrap={'wrap'}>
      <TotalUserCard />
      <CostsCard />
      <ActiveProjectsCard />
      <Box
        w="full"
        display={'grid'}
        gridTemplateColumns={{ md: '2fr 1fr' }}
        gap="7"
      >
        <QuotaionsBars quotationData={quotationData} />
        <TopEmployeesList />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
