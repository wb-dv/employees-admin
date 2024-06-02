import { UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { cn } from '@shared/utils';

import { useAccount } from '../api';

type AccountShortProps = {
  className?: string;
  right?: React.ReactNode;
};

export const AccountShort = ({ className, right }: AccountShortProps) => {
  const { user } = useAccount();

  return (
    <div
      className={cn(
        'flex gap-3 items-center p-2 bg-teal-100 rounded-sm',
        className,
      )}
    >
      <Avatar>
        <AvatarImage src={user?.image || ''} />
        <AvatarFallback>
          <div className="flex items-center justify-center rounded-full size-4 bg-slate-50 text-teal-950">
            <UserRound />
          </div>
        </AvatarFallback>
      </Avatar>

      <div className="text-ellipsis text-nowrap overflow-hidden">{`${
        user?.firstname || ''
      } ${user?.lastname || ''}`}</div>

      <div className="ml-auto">{right}</div>
    </div>
  );
};
