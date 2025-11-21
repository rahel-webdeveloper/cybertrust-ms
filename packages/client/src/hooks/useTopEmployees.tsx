import { useEmployeesFetch, type User } from '@/queries/useEmplyees';
import { useTasksFetch } from '@/queries/useTasks';

type ReturnType = {
  topEmployees: [];
  isUsersLoading: boolean;
  isTasksLoading: boolean;
};

export const useTopEmployees = (): ReturnType => {
  const { data: tasks, isLoading: isTasksLoading } = useTasksFetch();
  const { data: employees, isLoading: isUsersLoading } = useEmployeesFetch();

  const taskCount: [number] = tasks.data.reduce((acc, task) => {
    acc[task.assigned[0]] = (acc[task.assigned] || 0) + 1;
    return acc;
  }, {});

  const topEmployees = Object.entries(taskCount)
    .sort((a, b) => b[1] - a[1])
    .map(([userId, count]) => {
      const user = employees.data.find((user: User) => user._id === userId);

      return { ...user, taskCount: count };
    });

  return { topEmployees, isTasksLoading, isUsersLoading };
};
