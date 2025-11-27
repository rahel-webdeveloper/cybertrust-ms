import API from '@/api/axios-Instance';
import type { AddUserFormData } from '@/components/AddUserForm';
import { fetchUsers } from '@/services/userSevice';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

export const useAddUser = () => {
  return useMutation({
    mutationFn: (newUserData: AddUserFormData) =>
      API.post('api/users', newUserData).then((res) => res.data),
  });
};
