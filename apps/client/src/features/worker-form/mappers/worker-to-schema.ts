import { formatISO } from 'date-fns';
import parsePhoneNumber from 'libphonenumber-js';

import { WorkerResponseDto } from '@shared/api';

import { WorkerFormSchema } from '../model/worker-form-schema';

export const mapWorkerToSchema = (
  worker: WorkerResponseDto,
): WorkerFormSchema => {
  const phone = parsePhoneNumber(
    worker.phone.startsWith('+7')
      ? worker.phone
      : `+7${worker.phone.replace(/\D/g, '')}`,
  );

  return {
    firstname: worker.firstname,
    lastname: worker.lastname,
    patronymic: worker.patronymic,
    phone: phone?.number || '',
    jobTitleId: worker.jobTitle.id,
    departamentId: worker.department.id,
    email: worker.account.email,
    role: worker.account.role,
    dateOfBirth:
      worker.dateOfBirth &&
      formatISO(worker.dateOfBirth, { representation: 'date' }),
  };
};
