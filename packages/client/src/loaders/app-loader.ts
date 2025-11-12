import API from '@/api/axios-Instance';
import { toaster } from '@/components/ui/toaster';
import type { User } from '@/context/AuthContext';
import { redirect } from 'react-router-dom';

export const protectAppLoader = async () => {
  const ctToken = localStorage.getItem('ct-token');

  if (!ctToken) return redirect('/auth/login');

  const response = await API.get<User>('api/auth/me');

  if (!response.data) {
    toaster.create({
      title: 'Session Expired',
      description: 'Please log in again.',
      type: 'error',
    });
    localStorage.removeItem('ct-token');
    return redirect('/auth/login');
  }
  return response.data;
};
