import { Role } from '@entities/account';

import { routes } from '@shared/config/router';

type NavItem = {
  name: string;
  path: string;
};

const SHARED_NAVIGATION: NavItem[] = [
  { name: 'Сотрудники', path: routes.workers },
  { name: 'Отделы', path: routes.departments },
  { name: 'Должности', path: routes.jobTitles },
];

export const ROLES_NAVIGATION: Record<Role, NavItem[]> = {
  ADMIN: [...SHARED_NAVIGATION],
  USER: [...SHARED_NAVIGATION],
};
