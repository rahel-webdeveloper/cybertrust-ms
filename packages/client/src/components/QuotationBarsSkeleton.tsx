import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from '@chakra-ui/react';

const QuotationBarsSkeleton = () => {
  return (
    <Stack gap="6" p={4} borderWidth="1px" rounded="xl" width="full">
      <HStack width="full" alignItems="center" m={'auto'}>
        <SkeletonCircle size="8" />
        <SkeletonText noOfLines={1} height="24px" width="70%" />
      </HStack>

      <HStack gap={4} align="end" justify={'space-around'}>
        {[...Array(5)].map((_, index) => (
          <VStack key={index} gap={3}>
            <Skeleton height="80" w="10" />
            <Skeleton height="5" width={'10'} rounded="lg" />
          </VStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default QuotationBarsSkeleton;
