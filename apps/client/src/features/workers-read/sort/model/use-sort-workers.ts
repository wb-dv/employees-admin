import { useState } from 'react';

import { WorkersOrderedBy, WorkersSortDirection } from '@entities/worker';

export const useSortWorkers = () => {
  const [sortDirection, setSortDirection] =
    useState<WorkersSortDirection>('asc');

  const switchSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const [orderedBy, setOrderedBy] = useState<WorkersOrderedBy>('id');

  return {
    sortDirection,
    switchSortDirection,
    orderedBy,
    orderBy: setOrderedBy,
  };
};
