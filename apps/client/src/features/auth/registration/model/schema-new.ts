import { isMobilePhone } from 'validator';
import { z } from 'zod';

import { accountSchema } from '@entities/account';

const requiredField = 'обязательное поле';

export const newRegisterSchema = z
  .object({
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
  })
  .merge(
    accountSchema.omit({
      role: true,
    }),
  );

export type NewRegisterSchema = z.infer<typeof newRegisterSchema>;
