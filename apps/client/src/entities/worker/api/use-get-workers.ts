import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { WorkerResponseDto, workersControllerFindAll } from '@shared/api';

import { WorkersOrderedBy, WorkersSearch, WorkersSortDirection } from './types';

const WORKERS_PAGE_SIZE = 20;

type UseGetWorkersParams = {
  sortDirection?: WorkersSortDirection;
  orderedBy?: WorkersOrderedBy;
  search?: WorkersSearch;
  pageSize?: number;
};

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
    queryKey: ['workers', sortDirection, orderedBy, search, pageSize],
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPage.length < pageSize ? lastPageParam : lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, lastPageParam) => {
      return lastPageParam > 1 ? lastPageParam - 1 : lastPageParam;
    },
  });

  return {
    workers: data?.pages.flatMap((page) => page) || [],
    currentPage: data?.pageParams.at(-1) || 1,
    nextPage: fetchNextPage,
    prevPage: fetchPreviousPage,
    ...query,
  };
};
