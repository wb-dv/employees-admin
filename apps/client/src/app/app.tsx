import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';

import { queryClient } from '@shared/api';
import { Toaster } from '@shared/ui/toaster';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />

      <Toaster />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
