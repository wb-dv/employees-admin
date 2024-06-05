import { invalidateWorkers } from '@entities/worker';

import { useWorkersControllerUpdate } from '@shared/api';
import { useToast } from '@shared/ui/toaster';

import { mapSchemaToUpdateWorker } from '../mappers';
import { MutationCallbacks } from './types';
import { WorkerFormSchema } from './worker-form-schema';

type UseUpdateWorkerParams = MutationCallbacks & {
  workerId: number;
};

export const useUpdateWorker = ({
  workerId,
  onSuccess,
  onError,
}: UseUpdateWorkerParams) => {
  const { toast, errorToast } = useToast();

  const { mutate, mutateAsync, ...mutation } = useWorkersControllerUpdate({
    mutation: {
      onSuccess: () => {
        onSuccess?.();
        invalidateWorkers();
        toast({
          title: 'Сотрудник изменен',
          variant: 'success',
        });
      },
      onError: () => {
        onError?.();
        errorToast({
          message: 'Не удалось изменить сотрудника, попробуйте позже',
        });
      },
    },
  });

  const updateWorker = (workerSchema: WorkerFormSchema) => {
    return mutate({ data: mapSchemaToUpdateWorker(workerSchema, workerId) });
  };
  const updateWorkerAsync = (workerSchema: WorkerFormSchema) => {
    return mutateAsync({
      data: mapSchemaToUpdateWorker(workerSchema, workerId),
    });
  };

  return {
    updateWorker,
    updateWorkerAsync,
    ...mutation,
  };
};
