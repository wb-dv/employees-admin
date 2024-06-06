import {
  SearchWorkersSchema,
  useSearchState,
} from '@features/workers-read/search';
import { useSortWorkers } from '@features/workers-read/sort';

import { useGetWorkers } from '@entities/worker';

export const useFilteredSortedWorkers = () => {
  const { sortDirection, orderedBy, changeSort } = useSortWorkers();

  const { searchValues, search } = useSearchState();

  const {
    pagedWorkers,
    nextPage,
    prevPage,
    isLoading,
    hasNextPage,
    hasPreviousPage,
    currentPage,
    resetPage,
  } = useGetWorkers({
    sortDirection,
    orderedBy,
    search: searchValues,
    pageSize: 10,
  });

  const onSearch = (values: Partial<SearchWorkersSchema>) => {
    resetPage();
    search(values);
  };

  return {
    workers: pagedWorkers,
    isLoading,
    pagingOptions: {
      onPrevious: prevPage,
      onNext: nextPage,
      disabledPrev: !hasPreviousPage,
      disabledNext: !hasNextPage,
      currentPage,
    },
    sortInfo: {
      direction: sortDirection,
      orderedBy,
      changeSort,
    },
    search: onSearch,
  };
};
