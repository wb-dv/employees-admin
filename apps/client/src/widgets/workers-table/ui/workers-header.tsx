import { ChevronUp } from 'lucide-react';

import { WorkersSortInfo } from '@features/workers-read/sort';

import { TableHead, TableHeader, TableRow } from '@shared/ui/table';
import { cn } from '@shared/utils';

type WorkersHeaderProps = {
  sortInfo?: WorkersSortInfo;
};

type WorkerTh = {
  children: React.ReactNode;
  sortInfo?: Partial<WorkersSortInfo> & {
    sortField?: WorkersSortInfo['orderedBy'];
  };
};

const WorkerTh = ({ children, sortInfo }: WorkerTh) => (
  <TableHead className="!p-0 w-[calc(100%/8)] select-none">
    <div
      className={cn('size-full flex items-center justify-between p-4', {
        'hover:bg-teal-200 cursor-pointer transition-colors': !!sortInfo,
      })}
      onClick={() =>
        sortInfo &&
        sortInfo.sortField &&
        sortInfo.changeSort?.(sortInfo.sortField)
      }
    >
      {children}

      {!!sortInfo && sortInfo.orderedBy === sortInfo.sortField && (
        <ChevronUp
          className={cn('transition-transform', {
            'rotate-180': sortInfo.direction === 'desc',
          })}
        />
      )}
    </div>
  </TableHead>
);

export const WorkersHeader = ({ sortInfo }: WorkersHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <WorkerTh sortInfo={{ ...sortInfo, sortField: 'firstname' }}>
          Имя
        </WorkerTh>

        <WorkerTh sortInfo={{ ...sortInfo, sortField: 'lastname' }}>
          Фамилия
        </WorkerTh>

        <WorkerTh sortInfo={{ ...sortInfo, sortField: 'patronymic' }}>
          Отчество
        </WorkerTh>

        <WorkerTh sortInfo={{ ...sortInfo, sortField: 'phone' }}>
          Номер телефона
        </WorkerTh>

        <WorkerTh>Email</WorkerTh>

        <WorkerTh>Должность</WorkerTh>

        <WorkerTh>Отдел</WorkerTh>

        <WorkerTh sortInfo={{ ...sortInfo, sortField: 'dateOfEmployed' }}>
          Дата приема
        </WorkerTh>
      </TableRow>
    </TableHeader>
  );
};
