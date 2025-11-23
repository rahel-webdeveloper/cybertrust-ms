import { fetchProjects } from '@/services/projectService';
import { useQuery } from '@tanstack/react-query';

export const useProject = () => {
  return useQuery({
    queryKey: ['project'],
    queryFn: fetchProjects,
  });
};
