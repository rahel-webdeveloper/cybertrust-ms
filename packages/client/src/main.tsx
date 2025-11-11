import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './routes.tsx';
import { RouterProvider } from 'react-router-dom';
import { Provider } from './components/ui/provider.tsx';
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider defaultTheme="dark">
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>
);
