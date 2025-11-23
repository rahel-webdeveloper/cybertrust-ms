import { fetchUsers } from '@/services/userSevice';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
