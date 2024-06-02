import { isMobilePhone } from 'validator';
import { z } from 'zod';

import { credentialsSchema } from '@features/auth/model';

const requiredField = 'обязательное поле';

export const newRegisterSchema = z
  .object({
    firstname: z
      .string({ required_error: requiredField })
      .min(1, { message: requiredField }),
    patronymic: z
      .string({ required_error: requiredField })
      .min(1, { message: requiredField }),
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
  .merge(credentialsSchema);

export type NewRegisterSchema = z.infer<typeof newRegisterSchema>;
