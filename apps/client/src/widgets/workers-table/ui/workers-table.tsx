import { SearchWorkersForm } from '@features/workers-read/search';

import { useFilteredSortedWorkers } from '../model';

export const WorkersTable = () => {
  const { workers, search } = useFilteredSortedWorkers();

  console.log('workers: ', workers);

  return (
    <SearchWorkersForm
      onSearch={(value) => {
        console.log('onSearch: ', value);
        search(value);
      }}
    />
  );
};
