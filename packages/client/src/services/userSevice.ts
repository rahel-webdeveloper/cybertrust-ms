import API from '@/api/axios-Instance';

export const fetchUsers = async () => {
  const employees = await API.get('api/users');
  return employees.data;
};
