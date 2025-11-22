/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import API from '@/api/axios-Instance';
import type { User } from '@/queries/useEmplyees';

type AuthContextType = {
  user: User | null | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

const fetchUser = async (): Promise<User> =>
  API.get('api/auth/me').then((res) => res.data);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    enabled: !!localStorage.getItem('ct-token'),
    retry: false,
    staleTime: Infinity,
  });

  const logout = useCallback(() => {
    localStorage.removeItem('ct-token');
    queryClient.setQueryData(['user'], null);
    queryClient.invalidateQueries();
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isError, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
