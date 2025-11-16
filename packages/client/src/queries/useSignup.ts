import API from '@/api/axios-Instance';
import { toaster } from '@/components/ui/toaster';
import type { SignupFormData } from '@/pages/auth/SignupForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from './useEmplyeesList';

export type AuthAPIErrorType = {
  message: string;
  status: number;
};

type SignupResponseType = {
  token: string;
  user: User;
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<SignupResponseType, AuthAPIErrorType, SignupFormData>({
    mutationFn: (formData: SignupFormData) =>
      API.post('api/auth/sign-up', formData).then((res) => res.data),
    onSuccess: (newUser: SignupResponseType) => {
      localStorage.setItem('ct-token', newUser.token.toString());
      queryClient.setQueryData(['user'], () => newUser.user);
    },
    onError: (error: { message: string; status: number }) => {
      console.log(error.status);
      toaster.create({
        closable: true,
        type: 'error',
        title: 'Sign Up Failed',
        description:
          (error.status === 409 && 'User with this email already exist') ||
          'Something went wrong. Please try again later.',
      });
    },
  });
};
