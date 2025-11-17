import API from '@/api/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export const useCostsFetch = () => {
  return useQuery({
    queryKey: ['costs'],
    queryFn: () => API.get('api/costs').then((res) => res.data),
  });
};
