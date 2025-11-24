import ActiveProjectsCard from '@/components/ActiveProjectsCard';
import CostsCard from '@/components/CostsCard';
import QuotationDiv from '@/components/QuotationDiv';
import TopEmployeesListDiv from '@/components/TopEmployeesListDiv';
import TotalUserCard from '@/components/UsersCard';
import { Box, Flex } from '@chakra-ui/react';

const DashboardLayout = () => {
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
        <QuotationDiv />
        <TopEmployeesListDiv />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
