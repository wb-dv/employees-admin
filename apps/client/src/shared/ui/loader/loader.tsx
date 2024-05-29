import { cn } from '@shared/utils';

import styles from './loader.module.css';

type LoaderProps = {
  className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
  return <span className={cn(styles.loader, className)} />;
};
