import { useWorkersControllerFindOne } from '@shared/api';

type UseGetWorkerParams = {
  workerId: number;
};

export const useGetWorker = ({ workerId }: UseGetWorkerParams) => {
  return useWorkersControllerFindOne(workerId);
};
