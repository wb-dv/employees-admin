import { Loader } from '@shared/ui/loader';
import { TableCell, TableRow } from '@shared/ui/table';

export const LoaderRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center">
        <Loader size={'2xl'} />
      </TableCell>
    </TableRow>
  );
};
