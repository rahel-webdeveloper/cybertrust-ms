import API from '@/api/axios-Instance';

export const fetchQuotation = async () => {
  const employees = await API.get('api/quotations');
  return employees.data;
};
