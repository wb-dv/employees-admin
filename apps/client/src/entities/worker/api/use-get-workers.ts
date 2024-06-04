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

import { WorkersOrderedBy, WorkersSearch, WorkersSortDirection } from './types';

const WORKERS_PAGE_SIZE = 20;

const WORKER_INITIAL_PAGE = 1;

type UseGetWorkersParams = {
  sortDirection?: WorkersSortDirection;
  orderedBy?: WorkersOrderedBy;
  search?: WorkersSearch;
  pageSize?: number;
};

const GET_WORKERS_MAIN_KEY = 'workers';

export const useGetWorkers = ({
  sortDirection = 'asc',
  orderedBy = 'id',
  pageSize = WORKERS_PAGE_SIZE,
  search = {},
}: UseGetWorkersParams) => {
  const { data, fetchNextPage, fetchPreviousPage, ...query } = useInfiniteQuery<
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
      GET_WORKERS_MAIN_KEY,
      sortDirection,
      orderedBy,
      search,
      pageSize,
    ],
    initialPageParam: WORKER_INITIAL_PAGE,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < pageSize ? lastPageParam : lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, lastPageParam) => {
      return lastPageParam > 1 ? lastPageParam - 1 : lastPageParam;
    },
  });

  return {
    workers: data?.pages.flatMap((page) => page) || [],
    currentPage: data?.pageParams.at(-1) || WORKER_INITIAL_PAGE,
    nextPage: fetchNextPage,
    prevPage: fetchPreviousPage,
    ...query,
  };
};

export const invalidateWorkers = () => {
  return queryClient.invalidateQueries({ queryKey: [GET_WORKERS_MAIN_KEY] });
};
