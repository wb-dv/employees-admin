import { useState } from 'react';

import { WorkersOrderedBy, WorkersSortDirection } from '@entities/worker';

import { ChangeWorkersSort } from './types';

export const useSortWorkers = () => {
  const [sortDirection, setSortDirection] =
    useState<WorkersSortDirection>('asc');

  const [orderedBy, setOrderedBy] = useState<WorkersOrderedBy>('id');

  const changeSort: ChangeWorkersSort = (newOrderedBy) => {
    setOrderedBy(newOrderedBy);
    if (newOrderedBy === orderedBy) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortDirection('asc');
    }
  };

  return {
    sortDirection,
    changeSort,
    orderedBy,
  };
};
