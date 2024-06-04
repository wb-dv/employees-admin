import { z } from 'zod';

import { accountSchema } from '@entities/account';
import { workerSchema } from '@entities/worker';

import { requiredMessage } from '@shared/consts';

export const workerFormSchema = z.object({
  firstname: workerSchema.shape.firstname,
  lastname: workerSchema.shape.lastname,
  patronymic: workerSchema.shape.patronymic,
  phone: workerSchema.shape.phone,
  jobTitleId: workerSchema.shape.jobTitleId.positive({
    message: requiredMessage,
  }),
  departamentId: workerSchema.shape.departamentId.positive({
    message: requiredMessage,
  }),

  email: accountSchema.shape.email,
  role: accountSchema.shape.role,

  dateOfBirth: workerSchema.shape.dateOfBirth,
});

export type WorkerFormSchema = z.infer<typeof workerFormSchema>;

export const getWorkerFormInitialValues = (
  workerValues: Partial<WorkerFormSchema> = {},
): WorkerFormSchema => ({
  firstname: '',
  lastname: '',
  patronymic: '',
  phone: '',
  jobTitleId: 0,
  departamentId: 0,

  email: '',
  role: 'USER',

  dateOfBirth: undefined,

  ...workerValues,
});
