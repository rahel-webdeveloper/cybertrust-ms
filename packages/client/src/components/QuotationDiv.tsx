import { useQuotation } from '@/queries/quotations';
import QuotaionsBars from './QuotationsBars';
import { Icon, VStack, Text } from '@chakra-ui/react';
import { MountainSnow } from 'lucide-react';
import QuotationBarsSkeleton from './QuotationBarsSkeleton';

const QuotationDiv = () => {
  const { data: quotationData, isLoading, isRefetching } = useQuotation();

  if (isRefetching || isLoading) return <QuotationBarsSkeleton />;

  return (
    <VStack align={'start'} borderWidth={'1px'} rounded={'xl'}>
      <Text
        fontSize={'2xl'}
        m="5"
        // mx=""
        fontWeight={'500'}
        display={'flex'}
        gap={'3'}
        alignItems={'center'}
      >
        <Icon as={MountainSnow} color="cyan.400" />
        Hightest Project Qoutations
      </Text>
      <QuotaionsBars quotationData={quotationData} />
    </VStack>
  );
};

export default QuotationDiv;
