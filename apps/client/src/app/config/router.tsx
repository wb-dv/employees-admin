import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage } from '@pages/error';
import { Home } from '@pages/home';
import { Layout } from '@pages/layout';
import { LoginPage } from '@pages/login';
import { RegistrationPage } from '@pages/registration';

import { AuthGuard } from '@features/auth/permissions';

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
        path: routes.register,
        element: <RegistrationPage />,
      },
      {
        path: routes.index,
        element: <AuthGuard component={<Layout />} />,
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
