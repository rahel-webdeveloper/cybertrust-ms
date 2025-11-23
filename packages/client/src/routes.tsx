import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { Text } from '@chakra-ui/react';
import SignupForm from './pages/auth/SignupForm';
import AuthLayout from './pages/auth/AuthLayout';
import LoginForm from './pages/auth/LoginForm';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import EmployeesLayout from './pages/employee/EmployeesLayout';
import EmployeesList from './pages/employee/EmployeesList';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import TopEmployees from './pages/employee/TopEmployees';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'app'} replace />,
    errorElement: <ErrorPage />,
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
          {
            path: 'top-employees',
            element: <TopEmployees />,
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
    errorElement: <ErrorPage />,
    element: <NotFoundPage />,
  },
]);
export default router;
