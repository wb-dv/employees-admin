import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';

import { VirtualizedItem } from './types';

type UseVirtualizedInfiniteScrollParams<T> = {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  items: T[];
};

type UseVirtualizedInfiniteScrollReturn<T, E extends HTMLElement> = {
  parentRef: React.RefObject<HTMLDivElement>;
  containerHeight: number;
  firstOffset: number;
  virtualizedInfiniteItems: VirtualizedItem<T, E>[];
};

export const useVirtualizedInfiniteScroll = <
  ItemType,
  ElementType extends HTMLElement,
>({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  items,
}: UseVirtualizedInfiniteScrollParams<ItemType>): UseVirtualizedInfiniteScrollReturn<
  ItemType,
  ElementType
> => {
  const parentRef = useRef(null);

  const currentWorkerCount = items.length;

  const virtualized = useVirtualizer({
    overscan: 3,
    count: hasNextPage ? items.length + 1 : items.length,
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
    virtualizedInfiniteItems: items.length
      ? virtualWorkers
          .filter((item) => {
            const currentWorker = items[item.index];

            return !!currentWorker;
          })
          .map((item) => ({
            ...items[item.index],
            index: item.index,
            ref: item.measureElement,
          }))
      : [],
  };
};
