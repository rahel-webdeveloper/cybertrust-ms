import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { Text } from '@chakra-ui/react';
import SignupForm from './pages/auth/SignupForm';
import AuthLayout from './pages/auth/AuthLayout';
import LoginForm from './pages/auth/LoginForm';
import { protectAppLoader } from './loaders/app-loader';
import HydrationFallback from './components/HydrationFallback';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import EmployeesLayout from './pages/employee/EmployeesLayout';
import EmployeesList from './pages/employee/EmployeesList';
import DashboardLayout from './pages/dashboard/DashboardLayout';

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
        element: <LoginForm />,
      },
      {
        path: 'signup',
        element: <SignupForm />,
      },
    ],
  },
  {
    path: 'app',
    element: <App />,
    loader: protectAppLoader,
    hydrateFallbackElement: <HydrationFallback />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
      },
      {
        path: 'employees',
        element: <EmployeesLayout />,
        children: [
          {
            index: true,
            element: <EmployeesList />,
          },
        ],
      },
      {
        path: 'team',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            All Teams for admin
          </Text>
        ),
      },
      {
        path: 'projects',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            All Project for admin
          </Text>
        ),
      },
      {
        path: 'tasks',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            Project Tasks
          </Text>
        ),
      },
      {
        path: 'quotations',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            Project Quotations
          </Text>
        ),
      },
      {
        path: 'costs',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            Projects costs
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
      {
        path: 'about',
        element: (
          <Text fontSize="2xl" textAlign="center" pt="10">
            About page
          </Text>
        ),
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
export default router;
