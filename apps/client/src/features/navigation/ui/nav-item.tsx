import { NavLink } from 'react-router-dom';

import { cn } from '@shared/utils';

type OwnNavItemProps = {
  path: string;
  className?: string;
};

type NavItemWithChildren = {
  name?: never;
  children: React.ReactNode;
};

type NavItemWithoutChildren = {
  name: string;
  children?: never;
};

type NavItemProps = OwnNavItemProps &
  (NavItemWithChildren | NavItemWithoutChildren);

export const NavItem = ({ name, path, children, className }: NavItemProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'w-full flex items-center justify-center px-3 py-2 hover:bg-teal-600 text-slate-50 rounded-sm',
          {
            'bg-slate-50 text-teal-950': isActive,
          },
          className,
        )
      }
      to={path}
    >
      {children ? children : name}
    </NavLink>
  );
};
