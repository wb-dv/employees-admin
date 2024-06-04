import { useSearchState } from '@features/workers-read/search';
import { useSortWorkers } from '@features/workers-read/sort';

import { useGetWorkers } from '@entities/worker';

export const useFilteredSortedWorkers = () => {
  const { sortDirection, orderedBy, changeSort } = useSortWorkers();

  const { searchValues, search } = useSearchState();

  const { workers, nextPage, prevPage, isLoading } = useGetWorkers({
    sortDirection,
    orderedBy,
    search: searchValues,
  });

  return {
    workers,
    isLoading,
    nextPage,
    prevPage,
    sortInfo: {
      direction: sortDirection,
      orderedBy,
      changeSort,
    },
    search,
  };
};
