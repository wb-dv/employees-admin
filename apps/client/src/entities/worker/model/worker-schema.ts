import { isMobilePhone } from 'validator';
import { z } from 'zod';

const requiredField = 'обязательное поле';

export const workerSchema = z.object({
  firstname: z
    .string({ required_error: requiredField })
    .min(1, { message: requiredField }),
  patronymic: z.string().optional(),
  lastname: z
    .string({ required_error: requiredField })
    .min(1, { message: requiredField }),
  departamentId: z.number({ required_error: requiredField }).int(),
  jobTitleId: z.number({ required_error: requiredField }).int(),
  phone: z
    .string({ required_error: requiredField })
    .refine((phone) => isMobilePhone(phone, 'ru-RU'), {
      message: 'Неправильный формат телефона',
    }),
  dateOfBirth: z.string().date().optional(),
  dateOfEmployed: z.string().date(),

  account: z.object({
    id: z.number().int(),
    email: z.string(),
    role: z.enum(['USER', 'ADMIN']),
  }),
});

export type WorkerSchema = z.infer<typeof workerSchema>;
