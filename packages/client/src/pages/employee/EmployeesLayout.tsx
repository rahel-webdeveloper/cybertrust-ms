import { Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const EmployeesLayout = () => {
  return (
    <Grid
      placeItems="center"
      maxW="93dvw"
      overflowX="auto"
      scrollBehavior="smooth"
    >
      <Outlet />
    </Grid>
  );
};

export default EmployeesLayout;
