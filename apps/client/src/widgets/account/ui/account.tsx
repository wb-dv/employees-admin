import { Ban, Pencil } from 'lucide-react';
import { useState } from 'react';

import { WorkerUpdateForm } from '@features/worker-form';

import { AccountView, invalidateAccount, useAccount } from '@entities/account';

import { Button } from '@shared/ui/button';
import { Loader } from '@shared/ui/loader';
import { cn } from '@shared/utils';

export const Account = () => {
  const { user, isLoading, isError, isSuccess } = useAccount();

  const [isEdit, setIsEdit] = useState(false);

  if (isLoading)
    return (
      <div className="size-full flex items-center justify-center">
        <Loader size={'2xl'} />
      </div>
    );

  if (isError || !isSuccess || !user)
    return (
      <div className="text-center text-destructive bg-destructive-foreground">
        Произошла ошибка <Ban className="ml-2" />
      </div>
    );

  const onSuccessUpdate = () => {
    invalidateAccount();
    setIsEdit(false);
  };

  return (
    <div className="flex w-full flex-col gap-6 relative">
      <Button
        className={cn('w-fit ml-auto flex items-center gap-2', {
          'bg-teal-500 text-slate-50': isEdit,
        })}
        variant={'outline'}
        onClick={() => setIsEdit(!isEdit)}
      >
        <Pencil /> Редактировать профиль
      </Button>
      {isEdit ? (
        <WorkerUpdateForm workerId={user.id} onSuccess={onSuccessUpdate} />
      ) : (
        <AccountView user={user} size="xl" mode="full" />
      )}
    </div>
  );
};
