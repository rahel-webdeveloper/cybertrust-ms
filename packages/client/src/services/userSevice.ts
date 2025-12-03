import API from '@/api/axios-Instance';

export const fetchUsers = async () => {
  const employees = await API.get('api/users');
  return employees.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changeUserRole = async ({
  newRole,
  id,
}: {
  newRole: string;
  id: string;
}) => {
  const employees = await API.put(`api/users/change-role/${id}`, {
    userRole: newRole,
  });
  return employees.data;
};
