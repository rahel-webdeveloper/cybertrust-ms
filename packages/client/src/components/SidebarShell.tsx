import { Grid, Stack, Text, VStack } from '@chakra-ui/react';
import NavItem from './NavItem';
import { sidebarNav, sidebarNavBottom } from '@/data/cosnt-data';

const SidebarShell = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <VStack
      data-state="open"
      _open={{
        animationName: 'fade-in, scale-in',
        animationDuration: '300ms',
      }}
      alignItems="start"
      textAlign="center"
      display={{ base: 'none', md: 'block' }}
      borderWidth="1px"
      as="aside"
      position="sticky"
      top="0"
      h="dvh"
      color="white"
      p={4}
      w={isSidebarOpen ? '15rem' : '5rem'}
      transitionProperty="width"
      transitionDuration="moderate"
      transitionTimingFunction="ease-in-out"
      overflow="hidden"
    >
      <Text fontSize="xl" fontWeight="600">
        {isSidebarOpen ? 'CyberTrust' : 'CT'}
      </Text>

      <Stack rowGap={2} mt="10">
        {sidebarNav.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            item={item.name}
            path={item.path}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
      </Stack>

      <Grid rowGap="2" mt="6rem">
        {sidebarNavBottom.map((item) => (
          <NavItem
            key={item.name}
            path={item.path}
            icon={item.icon}
            item={item.name}
          />
        ))}
      </Grid>
    </VStack>
  );
};

export default SidebarShell;
