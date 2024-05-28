import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@pages/error';
import { Home } from '@pages/home';

import { routes } from '@shared/config/router';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);
