import { Ref } from 'react';

export type VirtualizedItem<T, E extends HTMLElement> = T & {
  index?: number;
  ref?: Ref<E>;
};
