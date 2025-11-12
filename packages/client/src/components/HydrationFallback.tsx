import { Grid, Spinner } from '@chakra-ui/react';

const HydrationFallback = () => {
  return (
    <Grid placeItems="center" h="dvh">
      <Spinner size="xl" textAlign="center" />
    </Grid>
  );
};

export default HydrationFallback;
