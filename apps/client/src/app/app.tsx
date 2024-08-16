import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { queryClient } from '@shared/api';
import { Toaster } from '@shared/ui/toaster';

import { store } from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Outlet />

        <Toaster />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};
