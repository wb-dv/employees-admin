import { createBrowserRouter } from 'react-router-dom';

import { AccountPage } from '@pages/account';
import { DepartmentsPage } from '@pages/departments';
import { ErrorPage } from '@pages/error';
import { Home } from '@pages/home';
import { JobTitlesPage } from '@pages/job-titles';
import { Layout } from '@pages/layout';
import { LoginPage } from '@pages/login';
import { RegistrationPage } from '@pages/registration';
import { WorkersPage } from '@pages/workers';

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
          {
            path: routes.workers,
            element: <WorkersPage />,
          },
          {
            path: routes.departments,
            element: <DepartmentsPage />,
          },
          {
            path: routes.jobTitles,
            element: <JobTitlesPage />,
          },
          {
            path: routes.account,
            element: <AccountPage />,
          },
        ],
      },
    ],
  },
]);
