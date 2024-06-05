import { Button } from '../button';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog-primitives';

type AlertDialogProps = {
  title?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const AlertDialog = ({
  title,
  trigger,
  children,
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: AlertDialogProps) => {
  return (
    <AlertDialogRoot open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {typeof trigger === 'string' ? (
          <Button variant="outline">{trigger}</Button>
        ) : (
          trigger
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}

          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Отменить</AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm}>Продолжить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};
