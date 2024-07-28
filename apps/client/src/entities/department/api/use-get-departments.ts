import { useDepartmentsControllerFindAll } from '@shared/api';

type UseGetDepartmentsQuery = typeof useDepartmentsControllerFindAll;

type UseGetDepartmentsParams = Parameters<UseGetDepartmentsQuery>[0];

export const useGetDepartments = (params: UseGetDepartmentsParams = {}) => {
  return useDepartmentsControllerFindAll({
    query: {
      ...params,
      // for ts
      select: (data) => data,
    },
  });
};
