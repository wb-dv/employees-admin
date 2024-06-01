import { useDepartmentsControllerFindAll } from '@shared/api';

type UseGetDepartmentsQuery = typeof useDepartmentsControllerFindAll;

type UseGetDepartmentsParams = Parameters<UseGetDepartmentsQuery>[0];

export const useGetDepartments = (params: UseGetDepartmentsParams = {}) => {
  const { data, ...query } = useDepartmentsControllerFindAll({
    query: {
      ...params,
      select: (data) => data,
    },
  });

  return {
    departments: data,
    ...query,
  };
};
