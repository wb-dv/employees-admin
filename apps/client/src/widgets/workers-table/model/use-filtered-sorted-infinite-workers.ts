import { useVirtualizedInfiniteScroll } from '@features/infinite-scroll';
import {
  SearchWorkersSchema,
  useSearchState,
} from '@features/workers-read/search';
import { useSortWorkers } from '@features/workers-read/sort';

import { useGetInfiniteWorkers } from '@entities/worker';

import { WorkerResponseDto } from '@shared/api';

export const useFilteredSortedInfiniteWorkers = () => {
  const { sortDirection, orderedBy, changeSort } = useSortWorkers();

  const { searchValues, search } = useSearchState();

  const {
    data: workers = [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteWorkers({
    sortDirection,
    orderedBy,
    search: searchValues,
    pageSize: 10,
  });

  const {
    virtualizedInfiniteItems: virtualizedInfiniteWorkers,
    parentRef,
    containerHeight,
    firstOffset,
  } = useVirtualizedInfiniteScroll<WorkerResponseDto, HTMLTableRowElement>({
    items: workers,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const onSearch = (values: Partial<SearchWorkersSchema>) => {
    search(values);
  };

  return {
    workers: virtualizedInfiniteWorkers,
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
