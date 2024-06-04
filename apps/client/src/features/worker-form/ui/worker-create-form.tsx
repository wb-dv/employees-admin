import { WorkerFormSchema } from '../model';
import { useCreateWorker } from '../model/use-create-worker';
import { WorkerForm } from './worker-form';

type WorkerCreateFormProps = {
  onSubmit?: (worker: WorkerFormSchema) => void;
  onSuccess?: () => void;
  onError?: () => void;
};

export const WorkerCreateForm = ({
  onSubmit,
  onSuccess,
  onError,
}: WorkerCreateFormProps) => {
  const { createWorker, isPending } = useCreateWorker({ onSuccess, onError });

  const submitHandler = (worker: WorkerFormSchema) => {
    createWorker(worker);
    onSubmit?.(worker);
  };

  return (
    <WorkerForm
      onSubmit={submitHandler}
      submitButtonText="Создать"
      isPending={isPending}
    />
  );
};
