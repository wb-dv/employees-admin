import { Navigate } from 'react-router-dom';

import { routes } from '@shared/config/router';
import { PageLoader } from '@shared/ui/loader';

import { RoleGuard, RoleGuardProps } from './role-guard';

type RoleGuardRedirectProps = Omit<
  RoleGuardProps,
  'errorComponent' | 'loadingComponent'
>;

export const RoleGuardRedirect = (props: RoleGuardRedirectProps) => {
  return (
    <RoleGuard
      {...props}
      loadingComponent={<PageLoader />}
      errorComponent={<Navigate to={routes.main} />}
    />
  );
};
