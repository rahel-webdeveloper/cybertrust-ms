import API from '@/api/axios-Instance';
import type { User } from '@/context/AuthContext';
import { redirect } from 'react-router-dom';

export const protectAppLoader = async () => {
  const ctToken = localStorage.getItem('ct-token');

  if (!ctToken) return redirect('/auth/login');

  const response = await API.get<User>('api/auth/me');

  return response.data;
};
