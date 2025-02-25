import { PropsWithChildren, Ref } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import { cn } from '@shared/utils';

type VirtualizeWrapperProps = PropsWithChildren<{
  parentRef: Ref<HTMLDivElement>;
  containerHeight: number;
  firstOffset: number;
  outerClassName?: string;
  innerClassName?: string;
}>;

export const VirtualizeWrapper = ({
  parentRef,
  containerHeight,
  firstOffset,
  outerClassName,
  innerClassName,
  children,
}: VirtualizeWrapperProps) => {
  return (
    <div className={cn('flex-auto', outerClassName)}>
      <AutoSizer>
        {({ width, height }) => (
          <div
            ref={parentRef}
            style={{ width, height }}
            className="w-full overflow-y-auto"
          >
            <div style={{ height: containerHeight }} className="relative">
              <div
                style={{ transform: `translateY(${firstOffset}px)` }}
                className={cn('absolute top-0 left-0 w-full', innerClassName)}
              >
                {children}
              </div>
            </div>
          </div>
        )}
      </AutoSizer>
    </div>
  );
};
