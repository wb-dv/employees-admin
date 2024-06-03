import { cn } from '@shared/utils';

type NavbarProps = {
  className?: string;
  children: React.ReactNode;
};

export const Navbar = ({ className, children }: NavbarProps) => {
  return (
    <nav className={cn('w-full flex items-center gap-2', className)}>
      {children}
    </nav>
  );
};
