import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import parsePhoneNumber from 'libphonenumber-js';
import { UserRound } from 'lucide-react';

import { WorkerResponseDto } from '@shared/api';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import { cn } from '@shared/utils';

type AccountViewProps = {
  user: WorkerResponseDto | undefined;
  size?: 's' | 'm' | 'l' | 'xl';
  mode?: 'short' | 'full';
  className?: string;
};

export const AccountView = ({
  user,
  size = 'm',
  mode = 'short',
  className,
}: AccountViewProps) => {
  const formattedName = `${user?.firstname || ''} ${user?.lastname || ''} ${
    mode === 'full' ? user?.patronymic || '' : ''
  }`.trim();

  return (
    <div className={cn('flex flex-col w-full gap-6', className)}>
      <Avatar
        className={cn({
          'size-5': size === 's',
          'size-10': size === 'm',
          'size-16': size === 'l',
          'size-20': size === 'xl',
        })}
      >
        <AvatarImage src={user?.image || ''} />
        <AvatarFallback>
          <div className="flex items-center justify-center rounded-full size-4 bg-slate-50 text-teal-950">
            <UserRound />
          </div>
        </AvatarFallback>
      </Avatar>

      <div
        className={cn('text-ellipsis text-nowrap overflow-hidden', {
          'text-sm': size === 's',
          'text-base': size === 'm',
          'text-lg': size === 'l',
          'text-xl': size === 'xl',
        })}
      >
        {formattedName}
      </div>

      {mode === 'full' && !!user && (
        <ul className="grid grid-cols-3 gap-7">
          <InfoItem>Должность: {user.jobTitle.name}</InfoItem>
          <InfoItem>Отдел: {user.department.name}</InfoItem>
          <InfoItem>
            Телефон: {parsePhoneNumber(user.phone)?.formatNational()}
          </InfoItem>
          <InfoItem>Почта: {user.account.email}</InfoItem>
          <InfoItem>
            Стаж: {formatDistanceToNow(user.dateOfEmployed, { locale: ru })}
          </InfoItem>
          <InfoItem>
            Дата приема на работу:{' '}
            {format(user.dateOfEmployed, 'P', { locale: ru })}
          </InfoItem>
          {user.dateOfBirth && (
            <InfoItem>
              Дата рождения: {format(user.dateOfBirth, 'P', { locale: ru })}
            </InfoItem>
          )}

          <InfoItem className="flex flex-col gap-3">
            <div>
              Роль в системе:{' '}
              {user.account.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
            </div>
            <div>
              {user.account.role === 'ADMIN'
                ? 'Вам доступны все данные на чтение и редактирование'
                : 'Вам доступны все данные только на чтение'}
            </div>
          </InfoItem>
        </ul>
      )}
    </div>
  );
};

type InfoItemProps = {
  children: React.ReactNode;
  className?: string;
};

const InfoItem = ({ children, className }: InfoItemProps) => {
  return (
    <li className={cn('bg-teal-100 rounded-md p-4', className)}>{children}</li>
  );
};
