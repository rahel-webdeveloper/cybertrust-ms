import API from '@/api/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export const useTasksFetch = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => API.get('api/tasks').then((res) => res.data),
  });
};
