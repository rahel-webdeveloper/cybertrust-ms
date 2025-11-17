import { useCostsFetch } from '@/queries/useCosts';
import {
  Badge,
  Box,
  FormatNumber,
  Icon,
  Spinner,
  Stat,
  Text,
} from '@chakra-ui/react';
import { ArrowDownCircle, Wallet } from 'lucide-react';

type Cost = {
  amount: number;
  descript: string;
  project: string;
};

const CostsCard = () => {
  const { data: projectCosts, isLoading } = useCostsFetch();

  if (isLoading) return <Spinner />;

  const totalCost = projectCosts.data.reduce(
    (acc: number, curr: Cost) => (acc += curr.amount),
    0
  );

  return (
    <Stat.Root borderWidth={'1px'} padding={'7'} rounded={'xl'}>
      <Stat.HelpText
        textAlign={'left'}
        fontSize={'md'}
        color="gray.100"
        w="max-content"
        fontWeight={'600'}
        justifyContent={'start'}
      >
        <Icon as={Wallet} color="yellow.300" size="lg" mr="2" /> Total Projects
        Costs
      </Stat.HelpText>
      <Stat.ValueText
        fontSize={'6xl'}
        display={'flex'}
        alignItems={'center'}
        gap={'5'}
      >
        <FormatNumber value={totalCost} style="currency" currency="USD" />
        <Box>
          <Badge
            colorPalette="red"
            variant={'surface'}
            fontSize={'md'}
            rounded={'lg'}
            size="lg"
            letterSpacing={'wider'}
          >
            <Icon size="sm" as={ArrowDownCircle} /> 11.7%
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

export default CostsCard;
