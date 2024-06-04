import { TableCell, TableRow } from '@shared/ui/table';

export const EmptyTableRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={8} className="text-center">
        Ничего не найдено
      </TableCell>
    </TableRow>
  );
};
