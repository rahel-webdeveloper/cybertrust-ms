import API from '@/api/axios-Instance';

export const fetchTasks = async () => {
  const employees = await API.get('api/tasks');
  return employees.data;
};
