import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@shared/ui/button';
import { Modal } from '@shared/ui/dialog';

import { WorkerUpdateForm } from './worker-update-form';

type WorkerUpdateModalProps = {
  workerId: number;
};

export const WorkerUpdateModal = ({ workerId }: WorkerUpdateModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      title="Редактирование сотрудника"
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <WorkerUpdateForm
          workerId={workerId}
          onSuccess={() => setIsOpen(false)}
        />
      }
      trigger={
        <Button className="flex items-center justify-center" variant={'ghost'}>
          <Pencil className="size-5" />
        </Button>
      }
    />
  );
};
