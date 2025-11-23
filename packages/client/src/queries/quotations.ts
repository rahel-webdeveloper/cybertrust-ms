import { fetchQuotation } from '@/services/quotation';
import { useQuery } from '@tanstack/react-query';

export const useQuotation = () => {
  return useQuery({
    queryKey: ['quotations'],
    queryFn: fetchQuotation,
  });
};
