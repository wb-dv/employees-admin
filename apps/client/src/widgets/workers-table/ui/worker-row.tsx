import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { EllipsisVertical } from 'lucide-react';
import { forwardRef } from 'react';

import { RoleGuard } from '@features/auth/permissions';
import { DeleteWorkerButton } from '@features/delete-worker';
import { WorkerUpdateModal } from '@features/worker-form';

import { WorkerResponseDto } from '@shared/api';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { TableCell, TableRow, TableRowProps } from '@shared/ui/table';

type WorkerRowProps = {
  worker: WorkerResponseDto;
} & TableRowProps;

export const WorkerRow = forwardRef<HTMLTableRowElement, WorkerRowProps>(
  ({ worker, ...props }, ref) => {
    return (
      <TableRow {...props} ref={ref}>
        <TableCell className="!p-0">
          <div className="flex items-center gap-1">
            <RoleGuard
              requiredRole="ADMIN"
              component={
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical />
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-fit p-1 flex items-center gap-1"
                  >
                    <WorkerUpdateModal workerId={worker.id} />
                    <DeleteWorkerButton workerId={worker.id} />
                  </PopoverContent>
                </Popover>
              }
            />
            {worker.firstname}
          </div>
        </TableCell>
        <TableCell>{worker.lastname}</TableCell>
        <TableCell>{worker.patronymic}</TableCell>
        <TableCell>{worker.phone}</TableCell>
        <TableCell className="break-words">{worker.account.email}</TableCell>
        <TableCell>{worker.jobTitle.name}</TableCell>
        <TableCell>{worker.department.name}</TableCell>
        <TableCell>
          {format(worker.dateOfEmployed, 'P', { locale: ru })}
        </TableCell>
      </TableRow>
    );
  },
);
