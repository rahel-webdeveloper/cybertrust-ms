import API from '@/api/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export const useProjectFetch = () => {
  return useQuery({
    queryKey: ['project'],
    queryFn: () => API.get('api/projects').then((res) => res.data),
  });
};
