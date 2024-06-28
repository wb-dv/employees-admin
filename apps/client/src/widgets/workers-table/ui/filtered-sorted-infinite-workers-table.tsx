import AutoSizer from 'react-virtualized-auto-sizer';

import { RoleGuard } from '@features/auth/permissions';
import { WorkerCreateModal } from '@features/worker-form';
import { SearchWorkersForm } from '@features/workers-read/search';

import { cn } from '@shared/utils';

import { useFilteredSortedInfiniteWorkers } from '../model';
import { WorkerRow } from './worker-row';
import { WorkersTable } from './workers-table';

type FilteredSortedWorkersTableProps = {
  className?: string;
};

export const FilteredSortedInfiniteWorkersTable = ({
  className,
}: FilteredSortedWorkersTableProps) => {
  const {
    workers,
    search,
    isLoading,
    sortInfo,
    parentRef,
    containerHeight,
    firstOffset,
  } = useFilteredSortedInfiniteWorkers();

  return (
    <div className={cn('w-full h-full flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <RoleGuard requiredRole="ADMIN" component={<WorkerCreateModal />} />
      </div>

      <SearchWorkersForm onSearch={search} />

      <div className="flex-auto">
        <AutoSizer disableWidth>
          {({ height }) => (
            <div
              ref={parentRef}
              style={{ height }}
              className="w-full overflow-y-auto"
            >
              <div style={{ height: containerHeight }} className="relative">
                <div
                  style={{ transform: `translateY(${firstOffset}px)` }}
                  className="absolute top-0 left-0 w-full"
                >
                  <WorkersTable
                    sortInfo={sortInfo}
                    isLoading={isLoading}
                    wrapperClassName="overflow-visible"
                    isEmpty={workers.length === 0}
                  >
                    {workers?.map((worker) => (
                      <WorkerRow
                        key={worker.id}
                        worker={worker}
                        ref={worker.ref}
                        data-index={worker.index}
                      />
                    ))}
                  </WorkersTable>
                </div>
              </div>
            </div>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
