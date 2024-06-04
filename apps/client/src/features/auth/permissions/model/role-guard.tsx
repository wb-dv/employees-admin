import { Role, useAccount } from '@entities/account';

export type RoleGuardProps = {
  requiredRole: Role;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  component: React.ReactNode;
};

export const RoleGuard = ({
  requiredRole,
  loadingComponent,
  errorComponent,
  component,
}: RoleGuardProps) => {
  const { user, isError, isPending } = useAccount();

  if (isPending) return loadingComponent;

  if (isError || user?.account?.role !== requiredRole) return errorComponent;

  return component;
};
