import { LogOut } from 'lucide-react';

import { Button, ButtonProps } from '@shared/ui/button';

import { useLogout } from '../model';

type LogoutButtonProps = Pick<ButtonProps, 'size' | 'variant'> & {
  className?: string;
};

export const LogoutButton = ({
  className,
  size,
  variant,
}: LogoutButtonProps) => {
  const { logout } = useLogout();

  return (
    <Button
      onClick={() => logout()}
      size={size}
      variant={variant}
      className={className}
    >
      {size === 'sm' ? <LogOut className="size-4" /> : 'Выйти'}
    </Button>
  );
};
