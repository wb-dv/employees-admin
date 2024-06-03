import {
  type GetWorkerDtoDirectionUnion,
  type GetWorkerDtoOrderedByUnion,
  SearchWorkerEntity,
} from '@shared/api';

export type WorkersSortDirection = GetWorkerDtoDirectionUnion;

export type WorkersOrderedBy = GetWorkerDtoOrderedByUnion;

export type WorkersSearch = SearchWorkerEntity;
