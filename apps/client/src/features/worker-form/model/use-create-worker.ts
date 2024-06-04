import { invalidateWorkers } from '@entities/worker';

import { useWorkersControllerCreate } from '@shared/api';
import { useToast } from '@shared/ui/toaster';

import { mapSchemaToCreateWorker } from '../mappers';
import { WorkerFormSchema } from './worker-form-schema';

type UseCreateWorkerParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useCreateWorker = ({
  onSuccess,
  onError,
}: UseCreateWorkerParams = {}) => {
  const { toast, errorToast } = useToast();

  const { mutate, mutateAsync, ...mutation } = useWorkersControllerCreate({
    mutation: {
      onSuccess: () => {
        onSuccess?.();
        invalidateWorkers();
        toast({
          title: 'Сотрудник создан',
          variant: 'success',
        });
      },
      onError: () => {
        onError?.();
        errorToast({
          message: 'Не удалось создать сотрудника, попробуйте позже',
        });
      },
    },
  });

  const createWorker = (workerSchema: WorkerFormSchema) => {
    return mutate({ data: mapSchemaToCreateWorker(workerSchema) });
  };
  const createWorkerAsync = (workerSchema: WorkerFormSchema) => {
    return mutateAsync({ data: mapSchemaToCreateWorker(workerSchema) });
  };

  return {
    createWorker,
    createWorkerAsync,
    ...mutation,
  };
};
