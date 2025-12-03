import { fetchEmployees, fetchTopEmployees } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';

export const useEmployee = () => {
  return useQuery({
    queryKey: ['employees-list'],
    queryFn: fetchEmployees,
  });
};

export const useTopEmployee = () => {
  return useQuery({
    queryKey: ['top-employees'],
    queryFn: fetchTopEmployees,
  });
};
