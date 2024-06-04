import { WorkersOrderedBy, WorkersSortDirection } from '@entities/worker';

export type ChangeWorkersSort = (newOrderedBy: WorkersOrderedBy) => void;

export type WorkersSortInfo = {
  direction: WorkersSortDirection;
  orderedBy: WorkersOrderedBy;
  changeSort: ChangeWorkersSort;
};
