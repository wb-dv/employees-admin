import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

import { InfiniteWorker } from './types';

type UseInfiniteWorkersParams = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  workers: InfiniteWorker[];
};

export const useInfiniteWorkers = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  workers,
}: UseInfiniteWorkersParams) => {
  const parentRef = useRef(null);

  const currentWorkerCount = workers.length;

  const virtualized = useVirtualizer({
    overscan: 3,
    count: hasNextPage ? workers.length + 1 : workers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
  });

  const virtualWorkers = virtualized.getVirtualItems();

  useEffect(() => {
    const lastWorker = virtualWorkers.at(-1);

    if (!lastWorker) return;

    if (
      !isFetchingNextPage &&
      hasNextPage &&
      lastWorker.index >= currentWorkerCount - 2
    ) {
      fetchNextPage();
    }
  }, [
    virtualWorkers,
    hasNextPage,
    fetchNextPage,
    currentWorkerCount,
    isFetchingNextPage,
  ]);

  return {
    parentRef,
    containerHeight: virtualized.getTotalSize(),
    firstOffset: virtualWorkers[0]?.start ?? 0,
    infiniteWorkers: workers.length
      ? virtualWorkers
          .filter((item) => {
            const currentWorker = workers[item.index];

            return !!currentWorker;
          })
          .map((item) => ({
            ...workers[item.index],
            index: item.index,
            ref: item.measureElement,
          }))
      : [],
  };
};
