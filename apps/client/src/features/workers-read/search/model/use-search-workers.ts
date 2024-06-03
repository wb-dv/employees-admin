import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'debounce';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { SearchWorkersSchema, searchWorkersSchema } from './search-schema';

export type UseSearchWorkersParams = {
  onSearch: (search: Partial<SearchWorkersSchema>) => void;
};

const DEBOUNCE_DELAY = 500;

export const useSearchWorkers = ({ onSearch }: UseSearchWorkersParams) => {
  const form = useForm<SearchWorkersSchema>({
    resolver: zodResolver(searchWorkersSchema),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, form.trigger, onSearch],
  );

  useEffect(() => {
    const subscription = form.watch(handleDebouncedChange);

    return () => subscription.unsubscribe();
  }, [form, form.watch, handleDebouncedChange]);

  return {
    searchForm: form,
  };
};
