import { useJobTitlesControllerFindAll } from '@shared/api';

type UseGetJobTitlesParams = Parameters<
  typeof useJobTitlesControllerFindAll
>[0];

export const useGetJobTitles = (params: UseGetJobTitlesParams = {}) => {
  return useJobTitlesControllerFindAll({
    query: {
      ...params,
      // for ts
      select: (data) => data,
    },
  });
};
