import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: 'auth',
    element: (
      <div>
        Auth pages <Outlet />
      </div>
    ),
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
        element: <div>Signup Page</div>,
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
          <div className="text-center">
            This is the dashboard for diffrent roles.
          </div>
        ),
      },
    ],
  },
]);
export default router;
