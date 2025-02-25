import { RoleGuard } from '@features/auth/permissions';
import { WorkerCreateModal } from '@features/worker-form';
import { PaginationButtons } from '@features/workers-read/pagination';
import { SearchWorkersForm } from '@features/workers-read/search';

import { cn } from '@shared/utils';

import { useFilteredSortedWorkers } from '../model';
import { WorkerRow } from './worker-row';
import { WorkersTable } from './workers-table';

type FilteredSortedWorkersTableProps = {
  className?: string;
};

export const FilteredSortedWorkersTable = ({
  className,
}: FilteredSortedWorkersTableProps) => {
  const { workers, search, isLoading, sortInfo, pagingOptions } =
    useFilteredSortedWorkers();

  return (
    <div className={cn('w-full flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <PaginationButtons pagingOptions={pagingOptions} />

        <RoleGuard requiredRole="ADMIN" component={<WorkerCreateModal />} />
      </div>

      <SearchWorkersForm onSearch={search} />

      <WorkersTable
        sortInfo={sortInfo}
        isLoading={isLoading}
        isEmpty={workers.length === 0}
      >
        {workers?.map((worker) => (
          <WorkerRow worker={worker} key={worker.id} />
        ))}
      </WorkersTable>
    </div>
  );
};
