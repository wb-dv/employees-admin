import { Navigate } from 'react-router-dom';

import { useAccount } from '@entities/account';

import { routes } from '@shared/config/router';
import { PageLoader } from '@shared/ui/loader';

type AuthGuardProps = {
  component: React.ReactNode;
};

export const AuthGuard = ({ component }: AuthGuardProps) => {
  const { isError, isPending } = useAccount();

  if (isPending) return <PageLoader />;

  if (isError) return <Navigate to={routes.main} />;

  return component;
};
