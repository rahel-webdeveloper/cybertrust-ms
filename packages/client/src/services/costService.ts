import API from '@/api/axios-Instance';

export const fetchCosts = async () => {
  const res = await API.get('api/costs');
  return res.data;
};
