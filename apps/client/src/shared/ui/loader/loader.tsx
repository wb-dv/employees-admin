import { VariantProps } from 'class-variance-authority';

import { cn } from '@shared/utils';

import styles from './loader.module.css';
import { loaderVariants } from './variants';

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export const Loader = ({ className, size }: LoaderProps) => {
  return (
    <span
      className={cn(
        loaderVariants({ size, className: styles.loader }),
        className,
      )}
    />
  );
};
