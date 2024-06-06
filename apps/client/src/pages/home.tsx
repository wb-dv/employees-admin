import { Navigate, useLocation } from 'react-router-dom';

import { routes } from '@shared/config/router';

export const Home = () => {
  const { pathname } = useLocation();

  if (pathname !== routes.main) return <Navigate to={routes.main} />;

  return (
    <div className="flex items-center gap-6">
      <h1>Home</h1>
    </div>
  );
};
