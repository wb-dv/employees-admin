import { Ban } from 'lucide-react';

import { useGetWorker } from '@entities/worker';

import { Loader } from '@shared/ui/loader';

import { MutationCallbacks, WorkerFormSchema, useUpdateWorker } from '../model';
import { WorkerForm } from './worker-form';

type WorkerUpdateFormProps = {
  workerId: number;
  onSubmit?: (worker: WorkerFormSchema) => void;
} & MutationCallbacks;

export const WorkerUpdateForm = ({
  workerId,
  onSubmit,
  onSuccess,
  onError,
}: WorkerUpdateFormProps) => {
  const { worker, isLoading, isError, isSuccess } = useGetWorker({
    workerId,
  });

  const { updateWorker, isPending } = useUpdateWorker({
    workerId,
    onSuccess,
    onError,
  });

  const submitHandler = (worker: WorkerFormSchema) => {
    updateWorker(worker);
    onSubmit?.(worker);
  };

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader size={'xl'} />
      </div>
    );

  if (isError || !isSuccess)
    return (
      <div className="flex h-full w-full items-center justify-center text-destructive bg-destructive-foreground">
        Не удалось загрузить сотрудника <Ban />
      </div>
    );

  return (
    <WorkerForm
      onSubmit={submitHandler}
      defaultWorker={worker}
      submitButtonText="Сохранить"
      isPending={isPending}
    />
  );
};
