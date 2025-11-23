import API from '@/api/axios-Instance';

export const fetchEmployees = async () => {
  const employees = await API.get('api/employees');
  return employees.data;
};

export const fetchTopEmployees = async () => {
  const employees = await API.get('api/employees/top/employees');
  return employees.data;
};
