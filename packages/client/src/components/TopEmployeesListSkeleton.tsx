import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

const TopActiveEmployeesSkeleton = () => {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <Stack borderWidth="1px" borderRadius="xl" position={'relative'}>
      <Flex m="5" gap={'3'} alignItems={'center'} alignSelf={'center'}>
        <Skeleton height="30px" width="200px" />
      </Flex>

      <Box mx={'4'} mt={'0'} mb="10">
        {skeletonItems.map((_, index) => (
          <Box p={4} borderBottomWidth={'1px'} key={index}>
            <Flex align="center" justify={'space-between'}>
              <Flex gap="2">
                <Skeleton>
                  <Avatar.Root shape="full" size="lg" cursor="pointer">
                    <Avatar.Fallback name={'@'} />
                  </Avatar.Root>
                </Skeleton>

                <Box>
                  <Skeleton height="15px" width="100px" mb="2" />
                  <Skeleton height="12px" width="140px" />
                </Box>
              </Flex>

              <HStack>
                <Skeleton height="20px" width="40px" rounded={'full'} />
              </HStack>

              <Skeleton height="12px" width="80px" />
            </Flex>
          </Box>
        ))}
      </Box>

      <Stack
        position={'absolute'}
        rounded={'xl'}
        w="full"
        h="45%"
        bottom={'0'}
        bgGradient="to-b"
        gradientFrom="transparent"
        gradientTo="whiteAlpha.500"
      >
        <Skeleton
          mx="auto"
          mt={'auto'}
          mb="8"
          px="6"
          rounded={'full'}
          height="40px"
          width="120px"
        >
          <Button>Show more..</Button>
        </Skeleton>
      </Stack>
    </Stack>
  );
};

export default TopActiveEmployeesSkeleton;
