import { useJobTitlesControllerFindAll } from '@shared/api';

type UseGetJobTitlesParams = Parameters<
  typeof useJobTitlesControllerFindAll
>[0];

export const useGetJobTitles = (params: UseGetJobTitlesParams = {}) => {
  const { data, ...query } = useJobTitlesControllerFindAll({
    query: {
      ...params,
      select: (data) => data,
    },
  });

  return {
    jobTitles: data,
    ...query,
  };
};
