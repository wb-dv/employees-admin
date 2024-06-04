import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

type ModalProps = {
  title?: string;
  description?: string;

  trigger: React.ReactNode;

  content: React.ReactNode;

  footer?: React.ReactNode;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Modal = ({
  title,
  description,
  trigger,
  content,
  footer,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild={typeof trigger !== 'string'}>
        {trigger}
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        {!!(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {content}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
