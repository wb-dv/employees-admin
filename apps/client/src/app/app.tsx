import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};
