import API from '@/api/axios-Instance';
import { toaster } from '@/components/ui/toaster';
import type { LoginFormData } from '@/pages/auth/LoginForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthAPIErrorType } from './useSignup';
import type { User } from './useEmplyeesList';

type LoginResponseType = {
  token: string;
  user: User;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponseType, AuthAPIErrorType, LoginFormData>({
    mutationFn: (formData: LoginFormData) =>
      API.post<LoginResponseType>('api/auth/login', formData).then(
        (res) => res.data
      ),
    onSuccess: (newUser: LoginResponseType) => {
      localStorage.setItem('ct-token', newUser.token.toString());
      queryClient.setQueryData(['user'], () => newUser.user);
    },
    onError: (error: { message: string; status: number }) => {
      toaster.create({
        closable: true,
        type: 'error',
        title: 'Login Failed',
        description:
          (error.status === 400 && 'Invalid email or password') ||
          'Something went wrong. Please try again later.',
      });
    },
  });
};
