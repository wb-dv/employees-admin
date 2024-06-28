import { Ref } from 'react';

import { WorkerResponseDto } from '@shared/api';

export type InfiniteWorker = WorkerResponseDto & {
  index?: number;
  ref?: Ref<HTMLTableRowElement>;
};
