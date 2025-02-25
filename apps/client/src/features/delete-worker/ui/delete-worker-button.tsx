import { Trash } from 'lucide-react';

import { useAccount } from '@entities/account';

import { MutationCallbacks } from '@shared/api';
import { AlertDialog } from '@shared/ui/alert-dialog';
import { Button } from '@shared/ui/button';

import { useDeleteWorker } from '../model';

type DeleteWorkerButtonProps = {
  workerId: number;
  variant?: 'icon' | 'text';
  className?: string;
} & MutationCallbacks;

export const DeleteWorkerButton = ({
  workerId,
  className,
  variant = 'icon',
  onSuccess,
  onError,
}: DeleteWorkerButtonProps) => {
  const { deleteWorker, isPending } = useDeleteWorker({ onSuccess, onError });

  const { data: user } = useAccount();

  const isMyAccount = user?.id === workerId;

  return (
    <AlertDialog
      title="Удаление сотрудника"
      trigger={
        <Button
          disabled={isPending}
          className={className}
          variant={'destructive'}
        >
          {variant === 'icon' && <Trash />}
          {variant === 'text' && 'Удалить сотрудника'}
        </Button>
      }
      onConfirm={() => !isMyAccount && deleteWorker(workerId)}
    >
      {isMyAccount
        ? 'Это ваш аккаунт, таким образом вы не можете удалить свой акканут.'
        : 'Вы уверены, что хотите удалить сотрудника?'}
    </AlertDialog>
  );
};
