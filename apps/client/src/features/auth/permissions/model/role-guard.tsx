import { Navigate } from 'react-router-dom';

import { Role, useAccount } from '@entities/account';

import { routes } from '@shared/config/router';
import { PageLoader } from '@shared/ui/loader';

type RoleGuardProps = {
  requiredRole: Role;
  component: React.ReactNode;
};

export const RoleGuard = ({ requiredRole, component }: RoleGuardProps) => {
  const { user, isError, isPending } = useAccount();

  if (isPending) return <PageLoader />;

  if (isError || user?.account?.role !== requiredRole)
    return <Navigate to={routes.login} />;

  return component;
};
