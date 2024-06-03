import { useState } from 'react';

import { SearchWorkersSchema } from '@features/workers-read/search';
import { useSortWorkers } from '@features/workers-read/sort';

import { useGetWorkers } from '@entities/worker';

export const useFilteredSortedWorkers = () => {
  const { sortDirection, switchSortDirection, orderedBy, orderBy } =
    useSortWorkers();

  const [searchValues, setSearchValues] = useState<
    Partial<SearchWorkersSchema> | undefined
  >();

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
    orderBy,
    switchSortDirection,
    search: setSearchValues,
  };
};
