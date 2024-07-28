import { NavLink } from 'react-router-dom';

import { routes } from '@shared/config/router';
import { cn } from '@shared/utils';

import { useAccount } from '../api';
import { AccountView } from './account-view';

type AccountShortProps = {
  className?: string;
  right?: React.ReactNode;
};

export const AccountShort = ({ className, right }: AccountShortProps) => {
  const { data: user } = useAccount();

  return (
    <div
      className={cn(
        'flex gap-3 items-center p-2 bg-teal-100 rounded-sm',
        className,
      )}
    >
      <NavLink
        to={routes.account}
        className={({ isActive }) =>
          cn({
            'bg-teal-200 rounded-md': isActive,
          })
        }
      >
        <AccountView
          className="flex-row items-center gap-3 px-2 py-1"
          user={user}
        />
      </NavLink>

      <div className="ml-auto">{right}</div>
    </div>
  );
};
