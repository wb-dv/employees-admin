import { useInfiniteWorkers } from '@features/workers-read/infinite-scroll';
import {
  SearchWorkersSchema,
  useSearchState,
} from '@features/workers-read/search';
import { useSortWorkers } from '@features/workers-read/sort';

import { useGetInfiniteWorkers } from '@entities/worker';

export const useFilteredSortedInfiniteWorkers = () => {
  const { sortDirection, orderedBy, changeSort } = useSortWorkers();

  const { searchValues, search } = useSearchState();

  const { workers, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInfiniteWorkers({
      sortDirection,
      orderedBy,
      search: searchValues,
      pageSize: 10,
    });

  const { infiniteWorkers, parentRef, containerHeight, firstOffset } =
    useInfiniteWorkers({
      workers,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    });

  const onSearch = (values: Partial<SearchWorkersSchema>) => {
    search(values);
  };

  return {
    workers: infiniteWorkers,
    isLoading,
    parentRef,
    containerHeight,
    firstOffset,
    sortInfo: {
      direction: sortDirection,
      orderedBy,
      changeSort,
    },
    search: onSearch,
  };
};
