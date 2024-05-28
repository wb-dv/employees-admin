import { ErrorPage } from '@pages/error';
import { Home } from '@pages/home';
import { routes } from '@shared/config/router';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);
