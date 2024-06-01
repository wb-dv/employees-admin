import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

import { Toaster } from '@shared/ui/toaster';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />

      <Toaster />
    </QueryClientProvider>
  );
};
