import API from '@/api/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export const useTask = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => API.get('api/tasks').then((res) => res.data),
  });
};
