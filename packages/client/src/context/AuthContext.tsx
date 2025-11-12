/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import API from '@/api/axios-Instance';

export type User = {
  name: string;
  email: string;
  role: string;
  id: string;
};

type AuthContextType = {
  user: User | null | undefined;
  isLoading: boolean;
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

  useEffect(() => {
    if (isError && !isLoading) logout();
  }, [isError, isLoading, logout]);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
