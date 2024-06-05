import { RoleGuard } from '@features/auth/permissions';
import { WorkerCreateModal } from '@features/worker-form';
import { SearchWorkersForm } from '@features/workers-read/search';

import { cn } from '@shared/utils';

import { useFilteredSortedWorkers } from '../model';
import { WorkersTable } from './workers-table';

type FilteredSortedWorkersTableProps = {
  className?: string;
};

export const FilteredSortedWorkersTable = ({
  className,
}: FilteredSortedWorkersTableProps) => {
  const { workers, search, isLoading, sortInfo } = useFilteredSortedWorkers();

  return (
    <div className={cn('w-full flex flex-col gap-4', className)}>
      <RoleGuard
        requiredRole="ADMIN"
        component={
          <div className="flex items-center justify-end">
            <WorkerCreateModal />
          </div>
        }
      />

      <SearchWorkersForm onSearch={search} />

      <WorkersTable
        sortInfo={sortInfo}
        isLoading={isLoading}
        workers={workers}
      />
    </div>
  );
};
