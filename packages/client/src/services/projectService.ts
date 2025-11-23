import API from '@/api/axios-Instance';

export const fetchProjects = async () => {
  const res = await API.get('api/projects');
  return res.data;
};
