import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@pages/error';
import { Home } from '@pages/home';
import { Layout } from '@pages/layout';
import { LoginPage } from '@pages/login';

import { routes } from '@shared/config/router';

import { App } from '../app';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.index,
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
]);
