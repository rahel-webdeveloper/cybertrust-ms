import ActiveProjectsCard from '@/components/ActiveProjectsCard';
import CostsCard from '@/components/CostsCard';
import TotalUserCard from '@/components/TotalUsersCard';
import { Flex } from '@chakra-ui/react';

const DashboardLayout = () => {
  return (
    <Flex gap="4" wrap={'wrap'}>
      <TotalUserCard />
      <CostsCard />
      <ActiveProjectsCard />
    </Flex>
  );
};

export default DashboardLayout;
