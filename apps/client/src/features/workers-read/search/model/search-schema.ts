import { z } from 'zod';

import { accountSchema } from '@entities/account';
import { workerSchema } from '@entities/worker';

export const searchWorkersSchema = z
  .object({
    account: accountSchema
      .omit({ password: true })
      .extend({
        email: z.string().optional(),
      })
      .partial(),
    dateOfBirth: workerSchema.shape.dateOfBirth.optional(),
    dateOfEmployed: workerSchema.shape.dateOfEmployed.optional(),
    departamentId: workerSchema.shape.departamentId.optional(),
    jobTitleId: workerSchema.shape.jobTitleId.optional(),
    firstname: workerSchema.shape.firstname.optional(),
    lastname: workerSchema.shape.lastname.optional(),
    patronymic: workerSchema.shape.patronymic,
    phone: z.string().optional(),
  })
  .optional();

export type SearchWorkersSchema = z.infer<typeof searchWorkersSchema>;
