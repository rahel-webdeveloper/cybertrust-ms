import API from '@/api/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export type Profile = {
  phone: number;
  country: string;
  avatarUrl: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatarUrl?: string;
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

export const useEmployeesList = () => {
  return useQuery({
    queryKey: ['employees-list'],
    queryFn: () => API.get('api/employees').then((res) => res.data),
  });
};
