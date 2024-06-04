import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { WorkerResponseDto } from '@shared/api';
import { TableCell, TableRow } from '@shared/ui/table';

type WorkerRowProps = {
  worker: WorkerResponseDto;
};

export const WorkerRow = ({ worker }: WorkerRowProps) => {
  return (
    <TableRow>
      <TableCell>{worker.firstname}</TableCell>
      <TableCell>{worker.lastname}</TableCell>
      <TableCell>{worker.patronymic}</TableCell>
      <TableCell>{worker.phone}</TableCell>
      <TableCell>{worker.account.email}</TableCell>
      <TableCell>{worker.jobTitle.name}</TableCell>
      <TableCell>{worker.department.name}</TableCell>
      <TableCell>
        {format(worker.dateOfEmployed, 'P', { locale: ru })}
      </TableCell>
    </TableRow>
  );
};
