import { WorkersTable } from '@widgets/workers-table';

export const WorkersPage = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1>Workers</h1>

      <WorkersTable />
    </div>
  );
};
