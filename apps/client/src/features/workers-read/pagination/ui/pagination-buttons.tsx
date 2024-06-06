import { ChevronLeft } from 'lucide-react';

import { Button } from '@shared/ui/button';
import { cn } from '@shared/utils';

import { PagingOptions } from '../model';

type PaginationButtonsProps = {
  className?: string;
  pagingOptions: PagingOptions;
};

export const PaginationButtons = ({
  className,
  pagingOptions: {
    onPrevious,
    onNext,
    disabledPrev,
    disabledNext,
    currentPage,
  },
}: PaginationButtonsProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-5', className)}>
      <Button onClick={onPrevious} disabled={disabledPrev}>
        <ChevronLeft />
      </Button>

      {currentPage}

      <Button onClick={onNext} disabled={disabledNext}>
        <ChevronLeft className="rotate-180" />
      </Button>
    </div>
  );
};
