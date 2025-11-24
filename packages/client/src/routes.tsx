import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import App from './App';
import AuthLayout from './pages/auth/AuthLayout';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import React from 'react';

// Lazy imports
const SignupForm = React.lazy(() => import('./pages/auth/SignupForm'));
const LoginForm = React.lazy(() => import('./pages/auth/LoginForm'));
const EmployeesLayout = React.lazy(
  () => import('./pages/employee/EmployeesLayout')
);
const EmployeesList = React.lazy(
  () => import('./pages/employee/EmployeesTable')
);
const DashboardLayout = React.lazy(
  () => import('./pages/dashboard/DashboardLayout')
);
const TopEmployees = React.lazy(
  () => import('./pages/employee/TopEmployeesCards')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'app'} replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'signup', element: <SignupForm /> },
    ],
  },
  {
    path: 'app',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardLayout /> },
      {
        path: 'employees',
        element: <EmployeesLayout />,
        children: [
          { index: true, element: <EmployeesList /> },
          { path: 'top-employees', element: <TopEmployees /> },
        ],
      },
      {
        path: 'team',
        element: <Text fontSize="2xl">All Teams for admin</Text>,
      },
      {
        path: 'projects',
        element: <Text fontSize="2xl">All Projects for admin</Text>,
      },
      { path: 'tasks', element: <Text fontSize="2xl">Project Tasks</Text> },
      {
        path: 'quotations',
        element: <Text fontSize="2xl">Project Quotations</Text>,
      },
      { path: 'costs', element: <Text fontSize="2xl">Projects costs</Text> },
      { path: 'settings', element: <Text fontSize="2xl">App Settings</Text> },
      { path: 'about', element: <Text fontSize="2xl">About page</Text> },
    ],
  },
  { path: '*', errorElement: <ErrorPage />, element: <NotFoundPage /> },
]);

export default router;
