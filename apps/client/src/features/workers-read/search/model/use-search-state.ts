import { useState } from 'react';

import { SearchWorkersSchema } from './search-schema';

export const useSearchState = () => {
  const [searchValues, setSearchValues] = useState<
    Partial<SearchWorkersSchema> | undefined
  >();

  const search = (values: Partial<SearchWorkersSchema>) => {
    setSearchValues(values);
  };

  return {
    searchValues,
    search,
  };
};
