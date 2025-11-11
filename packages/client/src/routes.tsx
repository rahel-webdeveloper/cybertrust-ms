import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { Text } from '@chakra-ui/react';
import SignUp from './pages/auth/SignUp';
import AuthLayout from './pages/auth/AuthLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Text fontSize="4xl" textAlign="center" pt="10">
        Landing Page
      </Text>
    ),
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <div>Login Page</div>,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: 'app',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            This is the dashboard for diffrent roles.
          </Text>
        ),
      },
      {
        path: 'users',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            Users Page for Admin
          </Text>
        ),
      },
      {
        path: 'settings',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            App Settings
          </Text>
        ),
      },
    ],
  },
]);
export default router;
