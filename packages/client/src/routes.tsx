import { Text } from '@chakra-ui/react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import Loader from './components/Loader';
import AuthLayout from './pages/auth/AuthLayout';
import LoginForm from './pages/auth/LoginForm';
import SignupForm from './pages/auth/SignupForm';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import EmployeesLayout from './pages/employee/EmployeesLayout';
import EmployeesTable from './pages/employee/EmployeesTable';
import TopEmployeesCardsDiv from './pages/employee/TopEmployeesCards';
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';

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
    hydrateFallbackElement: <Loader />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardLayout /> },
      {
        path: 'employees',
        element: <EmployeesLayout />,
        children: [
          { index: true, element: <EmployeesTable /> },
          { path: 'top-employees', element: <TopEmployeesCardsDiv /> },
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
