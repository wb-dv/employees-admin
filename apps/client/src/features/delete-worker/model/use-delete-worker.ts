import { invalidateWorkers } from '@entities/worker';

import { MutationCallbacks, useWorkersControllerRemove } from '@shared/api';
import { useToast } from '@shared/ui/toaster';

type UseDeleteWorkerParams = MutationCallbacks;

export const useDeleteWorker = ({
  onSuccess,
  onError,
}: UseDeleteWorkerParams) => {
  const { toast, errorToast } = useToast();

  const { mutate, mutateAsync, ...mutation } = useWorkersControllerRemove({
    mutation: {
      onSuccess: () => {
        onSuccess?.();
        invalidateWorkers();
        toast({ title: 'Сотрудник удален', variant: 'success' });
      },
      onError: () => {
        onError?.();
        errorToast({ message: 'Не удалось удалить сотрудника' });
      },
    },
  });

  const deleteWorker = (workerId: number) => {
    return mutate({ id: workerId });
  };

  const deleteWorkerAsync = (workerId: number) => {
    return mutateAsync({ id: workerId });
  };

  return { deleteWorker, deleteWorkerAsync, ...mutation };
};
