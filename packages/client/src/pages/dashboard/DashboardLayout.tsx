import ActiveProjectsCard from '@/components/ActiveProjectsCard';
import ActiveUsers from '@/components/ActiveUsers';
import CostsCard from '@/components/CostsCard';
import QuotaionsBars from '@/components/QuotationsBars';
import TotalUserCard from '@/components/UsersCard';
import { useQuotationFetch } from '@/queries/useQuotations';
import { Box, Flex } from '@chakra-ui/react';

const DashboardLayout = () => {
  const { data: quotationData, isLoading, isRefetching } = useQuotationFetch();

  if (isRefetching || isLoading) return;

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
        <ActiveUsers />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
