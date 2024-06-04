import { CreateWorkerDto } from '@shared/api';

import { WorkerFormSchema } from '../model';

export const mapSchemaToCreateWorker = (
  schema: WorkerFormSchema,
): CreateWorkerDto => {
  return {
    firstname: schema.firstname,
    lastname: schema.lastname,
    patronymic: schema.patronymic,
    phone: schema.phone,
    dateOfBirth: schema.dateOfBirth,
    jobTitleId: schema.jobTitleId,
    departamentId: schema.departamentId,
    email: schema.email,
    role: schema.role,
  };
};
