/* eslint-disable react-refresh/only-export-components */
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
  loginSuccess: (token: string) => void;
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

const fetchUser = async (): Promise<User> =>
  API.get('api/auth/me').then((res) => res.data);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('ct-token')
  );
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
  });

  const logout = useCallback(() => {
    localStorage.removeItem('ct-token');
    setToken(null);

    queryClient.setQueryData(['user'], null);
    queryClient.invalidateQueries();
  }, [queryClient]);

  const loginSuccess = useCallback(
    (newToken: string) => {
      localStorage.setItem('ct-token', `${newToken}`);
      setToken(newToken);

      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    [queryClient]
  );

  useEffect(() => {
    if (isError && !isLoading) logout();
  }, [isError, isLoading, logout]);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, loginSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
