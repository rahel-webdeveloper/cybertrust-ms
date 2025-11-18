import API from '@/api/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export const useQuotationFetch = () => {
  return useQuery({
    queryKey: ['quotations'],
    queryFn: () => API.get('api/quotations').then((res) => res.data),
  });
};
