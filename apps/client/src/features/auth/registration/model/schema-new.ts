import { isMobilePhone } from 'validator';
import { z } from 'zod';

import { credentialsSchema } from '@features/auth/model';

import { authControllerRegisterBody } from '@shared/api';

export const newRegisterSchema = authControllerRegisterBody
  .merge(credentialsSchema)
  .extend({
    phone: z.string().refine((phone) => isMobilePhone(phone, 'ru-RU'), {
      message: 'Неправильный формат телефона',
    }),
  });

export type NewRegisterSchema = z.infer<typeof newRegisterSchema>;

export const getDefaultNewRegisterValues = (
  defaultData: Partial<NewRegisterSchema> = {},
): NewRegisterSchema => ({
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  patronymic: '',
  phone: '',
  jobTitleId: 0,
  departamentId: 0,
  role: 'USER',
  ...defaultData,
});
