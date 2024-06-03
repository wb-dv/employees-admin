import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'debounce';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import {
  SearchWorkersSchema,
  defaultSearchValues,
  searchWorkersSchema,
} from './search-schema';

export type UseSearchWorkersParams = {
  onSearch: (search: Partial<SearchWorkersSchema>) => void;
};

const DEBOUNCE_DELAY = 500;

export const useSearchWorkers = ({ onSearch }: UseSearchWorkersParams) => {
  const form = useForm<SearchWorkersSchema>({
    resolver: zodResolver(searchWorkersSchema),
    defaultValues: defaultSearchValues,
  });

  const handleDebouncedChange = useMemo(
    () =>
      debounce((values: Partial<SearchWorkersSchema>) => {
        try {
          const search = searchWorkersSchema.parse(values);

          onSearch(search);
        } catch {
          form.trigger();
        }
      }, DEBOUNCE_DELAY),
    [form, onSearch],
  );

  useEffect(() => {
    const subscription = form.watch(handleDebouncedChange);

    return () => subscription.unsubscribe();
  }, [form, handleDebouncedChange]);

  return {
    searchForm: form,
    reset: () => form.reset(defaultSearchValues),
  };
};
