import { FilteredSortedWorkersTable } from '@widgets/workers-table';

export const WorkersPage = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <FilteredSortedWorkersTable />
    </div>
  );
};
