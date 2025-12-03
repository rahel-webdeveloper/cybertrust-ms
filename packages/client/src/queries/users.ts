import API from '@/api/axios-Instance';
import type { AddUserFormData } from '@/components/AddUserForm';
import { changeUserRole, fetchUsers } from '@/services/userSevice';
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

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ['users'],
    mutationFn: (userEmail: string) =>
      API.delete(`/api/users/${userEmail}`).then((res) => res.data),
  });
};

export const useUserRole = () => {
  return useMutation({
    mutationKey: ['users'],
    mutationFn: changeUserRole,
  });
};
