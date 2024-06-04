import { z } from 'zod';

import { accountSchema } from '@entities/account';
import { workerSchema } from '@entities/worker';

export const searchWorkersSchema = z.object({
  account: accountSchema
    .omit({ password: true })
    .extend({
      email: z.string().optional(),
    })
    .partial(),
  dateOfBirth: workerSchema.shape.dateOfBirth,
  dateOfEmployed: workerSchema.shape.dateOfEmployed.optional(),
  departamentId: workerSchema.shape.departamentId.optional(),
  jobTitleId: workerSchema.shape.jobTitleId.optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  patronymic: workerSchema.shape.patronymic,
  phone: z.string().optional(),
});

export type SearchWorkersSchema = z.infer<typeof searchWorkersSchema>;

export const defaultSearchValues: Partial<SearchWorkersSchema> = {
  account: {
    email: '',
    role: undefined,
  },
  dateOfBirth: undefined,
  dateOfEmployed: undefined,
  departamentId: undefined,
  jobTitleId: undefined,
  firstname: '',
  lastname: '',
  patronymic: '',
  phone: undefined,
};
