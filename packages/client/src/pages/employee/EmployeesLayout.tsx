import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const EmployeesLayout = () => {
  return (
    <Box maxW="93dvw" overflowX="auto" scrollBehavior="smooth">
      <Outlet />
    </Box>
  );
};

export default EmployeesLayout;
