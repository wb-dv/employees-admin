import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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

const nextPageExisted = (workers: WorkerResponseDto[], pageSize: number) =>
  workers.length === pageSize;

const prevPageExisted = (currentPage: number) => currentPage > 1;

export const useGetWorkers = ({
  sortDirection = 'asc',
  orderedBy = 'id',
  pageSize = WORKERS_PAGE_SIZE,
  search = {},
}: UseGetWorkersParams) => {
  const [currentPage, setCurrPage] = useState(WORKER_INITIAL_PAGE);

  const { data, ...query } = useQuery<WorkerResponseDto[]>({
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
    ...query,
  };
};

export const invalidateWorkers = () => {
  return queryClient.invalidateQueries({ queryKey: [GET_WORKERS_MAIN_KEY] });
};
