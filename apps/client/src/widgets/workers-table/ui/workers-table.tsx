import { WorkersSortInfo } from '@features/workers-read/sort';

import { Table, TableBody } from '@shared/ui/table';

import { EmptyTableRow } from './empty-table-row';
import { LoaderRow } from './loader-row';
import { WorkersHeader } from './workers-header';

type WorkersTableProps = {
  // workers: InfiniteWorker[];
  isLoading?: boolean;
  sortInfo?: WorkersSortInfo;
  wrapperClassName?: string;
  children: React.ReactNode;
  isEmpty?: boolean;
};

export const WorkersTable = ({
  children,
  isEmpty,
  isLoading,
  sortInfo,
  wrapperClassName,
}: WorkersTableProps) => {
  return (
    <Table className="table-fixed" wrapperClassName={wrapperClassName}>
      <WorkersHeader sortInfo={sortInfo} />

      <TableBody>
        {!isLoading && isEmpty && <EmptyTableRow key={'empty'} />}

        {isLoading && <LoaderRow />}

        {!isLoading && children}
      </TableBody>
    </Table>
  );
};
