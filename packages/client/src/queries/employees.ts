import { fetchEmployees, fetchTopEmployees } from '@/services/employeeService';
import { useQuery } from '@tanstack/react-query';

export type Profile = {
  phone: number;
  country: string;
  avatarUrl: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profile: Profile;
};

export type Employee = {
  position: string;
  department: string;
  hireDate: Date;
  salary: number;
};

export interface EmployeeDataResponse {
  id: string;
  department: string;
  position: string;
  salary: number;
  hireDate: Date;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    profile: Profile;
  };
}

// type GetEmployeesResponse
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
