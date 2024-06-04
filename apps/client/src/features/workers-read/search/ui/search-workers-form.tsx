import { Filter } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@shared/ui/button';
import { Modal } from '@shared/ui/dialog';
import { Form } from '@shared/ui/form';
import { cn } from '@shared/utils';

import { UseSearchWorkersParams, useSearchWorkers } from '../model';
import { FullSearch } from './full-search';
import { ShortSearch } from './short-search';

type SearchWorkersFormProps = UseSearchWorkersParams & {
  className?: string;
};

export const SearchWorkersForm = ({
  className,
  onSearch,
}: SearchWorkersFormProps) => {
  const [openFullSearch, setOpenFullSearch] = useState(false);

  const { searchForm, submit, reset } = useSearchWorkers({
    onSearch,
    searchMode: openFullSearch ? 'on-submit' : 'on-change',
  });

  return (
    <Form {...searchForm}>
      <div className={cn('flex w-full items-end gap-3', className)}>
        <ShortSearch searchForm={searchForm} onSubmit={submit} />

        <Modal
          trigger={
            <Button>
              <Filter />
            </Button>
          }
          content={
            <FullSearch
              searchForm={searchForm}
              onSubmit={submit}
              onReset={reset}
            />
          }
          open={openFullSearch}
          onOpenChange={setOpenFullSearch}
        />

        <div className="flex items-center justify-end">
          <Button variant={'ghost'} type="button" onClick={reset}>
            Сброс
          </Button>
        </div>
      </div>
    </Form>
  );
};
