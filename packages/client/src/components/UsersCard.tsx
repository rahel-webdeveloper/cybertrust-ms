import { useUserFetch } from '@/queries/useUsers';
import { Badge, Box, FormatNumber, Icon, Stat, Text } from '@chakra-ui/react';
import { ArrowUpCircle, UserCheck } from 'lucide-react';
import DashboardCardSkeleton from './DashboardCardSkeleton';

const TotalUserCard = () => {
  const { data, isLoading, isRefetching } = useUserFetch();

  if (isLoading || isRefetching) return <DashboardCardSkeleton />;

  return (
    <Stat.Root borderWidth={'1px'} padding={'7'} rounded={'xl'} gap="">
      <Stat.HelpText
        textAlign={'left'}
        fontSize={'md'}
        color="gray.100"
        fontWeight={'600'}
        justifyContent={'start'}
      >
        <Icon as={UserCheck} color="teal.400" size="lg" mr="2" /> Total
        Employees
      </Stat.HelpText>
      <Stat.ValueText
        fontSize={'6xl'}
        display={'flex'}
        alignItems={'center'}
        gap={'5'}
      >
        <FormatNumber value={data.data.length} style="decimal" />
        <Box>
          <Badge
            colorPalette="green"
            variant={'surface'}
            bgColor={'green.300/15'}
            fontSize={'md'}
            rounded={'lg'}
            size="lg"
            letterSpacing={'wider'}
          >
            <Icon size="sm" as={ArrowUpCircle} /> 12.8%
          </Badge>
          <Text
            fontSize={'.7rem'}
            fontWeight={'600'}
            letterSpacing={'tight'}
            color="gray.400"
          >
            vs last month
          </Text>
        </Box>
      </Stat.ValueText>
    </Stat.Root>
  );
};

export default TotalUserCard;
