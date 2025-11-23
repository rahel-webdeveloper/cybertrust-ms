import { fetchCosts } from '@/services/costService';
import { useQuery } from '@tanstack/react-query';

export const useCosts = () => {
  return useQuery({
    queryKey: ['costs'],
    queryFn: fetchCosts,
  });
};
