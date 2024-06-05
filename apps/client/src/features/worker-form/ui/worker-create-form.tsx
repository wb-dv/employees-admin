import { MutationCallbacks, WorkerFormSchema, useCreateWorker } from '../model';
import { WorkerForm } from './worker-form';

type WorkerCreateFormProps = {
  onSubmit?: (worker: WorkerFormSchema) => void;
} & MutationCallbacks;

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
