import { FilteredSortedInfiniteWorkersTable } from '@widgets/workers-table';

export const WorkersPage = () => {
  return (
    <div className="flex flex-col items-center p-5 h-full">
      <FilteredSortedInfiniteWorkersTable />
    </div>
  );
};
