import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'debounce';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { deleteEmptyValues } from '@shared/utils';

import {
  SearchWorkersSchema,
  defaultSearchValues,
  searchWorkersSchema,
} from './search-schema';

export type UseSearchWorkersParams = {
  onSearch: (search: Partial<SearchWorkersSchema>) => void;
  searchMode?: 'on-submit' | 'on-change';
};

const DEBOUNCE_DELAY = 500;

export const useSearchWorkers = ({
  onSearch,
  searchMode = 'on-change',
}: UseSearchWorkersParams) => {
  const form = useForm<SearchWorkersSchema>({
    resolver: zodResolver(searchWorkersSchema),
    defaultValues: defaultSearchValues,
  });

  const handleDebouncedChange = useMemo(
    () =>
      debounce((values: Partial<SearchWorkersSchema>) => {
        try {
          const search = deleteEmptyValues(searchWorkersSchema.parse(values));

          if (searchMode === 'on-change') onSearch(search);
        } catch {
          form.trigger();
        }
      }, DEBOUNCE_DELAY),
    [form, onSearch, searchMode],
  );

  useEffect(() => {
    const subscription = form.watch(handleDebouncedChange);

    return () => subscription.unsubscribe();
  }, [form, handleDebouncedChange]);

  const reset = () => {
    form.reset(defaultSearchValues);
    onSearch(deleteEmptyValues(form.getValues()));
  };

  return {
    searchForm: form,
    submit: form.handleSubmit(
      searchMode === 'on-submit'
        ? (values) => onSearch(deleteEmptyValues(values))
        : () => {},
    ),
    reset,
  };
};
