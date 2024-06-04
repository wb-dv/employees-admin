import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@shared/ui/button';
import { Modal } from '@shared/ui/dialog';

import { WorkerCreateForm } from './worker-create-form';

export const WorkerCreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      title="Создание сотрудника"
      open={isOpen}
      onOpenChange={setIsOpen}
      content={<WorkerCreateForm onSuccess={() => setIsOpen(false)} />}
      trigger={
        <Button className="flex items-center gap-2">
          <Plus className="size-5" /> <div>Создать сотрудника</div>
        </Button>
      }
    />
  );
};
