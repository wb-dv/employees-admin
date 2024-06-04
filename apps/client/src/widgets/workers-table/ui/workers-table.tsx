import { WorkersSortInfo } from '@features/workers-read/sort';

import { WorkerResponseDto } from '@shared/api';
import { Table, TableBody } from '@shared/ui/table';

import { EmptyTableRow } from './empty-table-row';
import { LoaderRow } from './loader-row';
import { WorkerRow } from './worker-row';
import { WorkersHeader } from './workers-header';

type WorkersTableProps = {
  workers: WorkerResponseDto[];
  isLoading?: boolean;
  sortInfo?: WorkersSortInfo;
};

export const WorkersTable = ({
  workers,
  isLoading,
  sortInfo,
}: WorkersTableProps) => {
  const isEmpty = workers.length === 0;

  return (
    <Table>
      <WorkersHeader sortInfo={sortInfo} />

      <TableBody className="max-h-[600px] overflow-auto">
        {!isLoading && isEmpty && <EmptyTableRow key={'empty'} />}

        {isLoading && <LoaderRow />}

        {!isLoading &&
          workers.map((worker) => (
            <WorkerRow worker={worker} key={worker.id} />
          ))}
      </TableBody>
    </Table>
  );
};
