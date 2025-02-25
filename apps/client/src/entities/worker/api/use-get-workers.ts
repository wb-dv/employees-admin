import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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

type UseGetWorkersParams = GetWorkersParams;

const GET_WORKERS_MAIN_KEY = 'workers';

const nextPageExisted = (workers: WorkerResponseDto[], pageSize: number) =>
  workers.length === pageSize;

const prevPageExisted = (currentPage: number) => currentPage > 1;

export const useGetWorkers = ({
  sortDirection = DEFAULT_SORT_DIRECTION,
  orderedBy = DEFAULT_ORDERED_BY,
  pageSize = DEFAULT_WORKERS_PAGE_SIZE,
  search = {},
}: UseGetWorkersParams) => {
  const [currentPage, setCurrPage] = useState(WORKER_INITIAL_PAGE);

  const queryResult = useQuery<WorkerResponseDto[]>({
    queryFn: () =>
      workersControllerFindAll({
        paging: { page: currentPage, size: pageSize },
        direction: sortDirection,
        orderedBy,
        search,
      }),
    queryKey: [
      GET_WORKERS_MAIN_KEY,
      sortDirection,
      orderedBy,
      search,
      currentPage,
      pageSize,
    ],
  });

  const data = queryResult.data;

  const fetchNextPage = () => {
    setCurrPage((prev) => {
      if (!data?.length) return prev;

      return nextPageExisted(data, pageSize) ? prev + 1 : prev;
    });
  };

  const fetchPreviousPage = () => {
    setCurrPage((prev) => (prevPageExisted(prev) ? prev - 1 : prev));
  };

  const resetPage = () => {
    setCurrPage(WORKER_INITIAL_PAGE);
  };

  return {
    pagedWorkers: data || [],
    currentPage,
    nextPage: fetchNextPage,
    prevPage: fetchPreviousPage,
    resetPage,
    hasNextPage: nextPageExisted(data || [], pageSize),
    hasPreviousPage: prevPageExisted(currentPage),
    query: queryResult,
  };
};

export const invalidateWorkers = () => {
  return queryClient.invalidateQueries({ queryKey: [GET_WORKERS_MAIN_KEY] });
};
