import { X } from 'lucide-react';

import { cn } from '@shared/utils';

type ClearButtonProps = {
  className?: string;
  onClear: () => void;
};

export const ClearButton = ({ className, onClear }: ClearButtonProps) => {
  return (
    <div
      onClick={onClear}
      className={cn(
        'h-full flex items-center justify-center p-0 px-3 hover:bg-red-200 transition-colors rounded',
        className,
      )}
    >
      <X className="size-4" />
    </div>
  );
};
