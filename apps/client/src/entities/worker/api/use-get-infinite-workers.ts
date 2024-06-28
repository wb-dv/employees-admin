import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {
  WorkerResponseDto,
  queryClient,
  workersControllerFindAll,
} from '@shared/api';

import {
  DEFAULT_ORDERED_BY,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_WORKERS_PAGE_SIZE,
  WORKER_INITIAL_PAGE,
} from './consts';
import { GetWorkersParams } from './types';

type UseGetInfiniteWorkersParams = GetWorkersParams;

const GET_INFINITE_WORKERS_MAIN_KEY = 'infinite-workers';

export const useGetInfiniteWorkers = ({
  orderedBy = DEFAULT_ORDERED_BY,
  pageSize = DEFAULT_WORKERS_PAGE_SIZE,
  sortDirection = DEFAULT_SORT_DIRECTION,
  search = {},
}: UseGetInfiniteWorkersParams) => {
  const { data, ...query } = useInfiniteQuery<
    WorkerResponseDto[],
    Error,
    InfiniteData<WorkerResponseDto[], number>,
    QueryKey,
    number
  >({
    queryFn: ({ pageParam }) =>
      workersControllerFindAll({
        paging: { page: pageParam, size: pageSize },
        direction: sortDirection,
        orderedBy,
        search,
      }),
    queryKey: [
      GET_INFINITE_WORKERS_MAIN_KEY,
      sortDirection,
      orderedBy,
      search,
      pageSize,
    ],
    initialPageParam: WORKER_INITIAL_PAGE,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  return {
    workers: data?.pages.flat() || [],
    ...query,
  };
};

export const invalidateInfiniteWorkers = () => {
  queryClient.invalidateQueries({ queryKey: [GET_INFINITE_WORKERS_MAIN_KEY] });
};