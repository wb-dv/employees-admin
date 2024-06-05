import { useWorkersControllerFindOne } from '@shared/api';

type UseGetWorkerParams = {
  workerId: number;
};

export const useGetWorker = ({ workerId }: UseGetWorkerParams) => {
  const { data, ...query } = useWorkersControllerFindOne(workerId);

  return {
    worker: data,
    ...query,
  };
};
