import { Box, Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const DashboardCardSkeleton = () => {
  return (
    <Box borderWidth={'1px'} padding={'7'} rounded={'xl'}>
      <Flex alignItems="center" mb={4}>
        <SkeletonCircle size="6" mr="2" />
        <SkeletonText noOfLines={1} width="150px" h="3" />
      </Flex>

      <Flex alignItems={'center'} gap={'5'}>
        <SkeletonText noOfLines={1} width="120px" h="10" />

        <Box>
          <Flex alignItems="center" mb={1}>
            <SkeletonCircle size="4" mr={1} />
            <SkeletonText noOfLines={1} width="70px" height="3" />
          </Flex>

          <SkeletonText noOfLines={1} width="90px" height="2" mt={1} />
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardCardSkeleton;
