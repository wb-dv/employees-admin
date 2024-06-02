import { useAccount } from '@entities/account';

import { ROLES_NAVIGATION } from './roles-navigation';

export const useRolesNavigation = () => {
  const { user } = useAccount();

  const role = user?.account?.role;

  return role ? ROLES_NAVIGATION[role] : [];
};
