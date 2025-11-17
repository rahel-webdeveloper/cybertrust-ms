import API from '@/api/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export const useUserFetch = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => API.get('api/users').then((res) => res.data),
  });
};
