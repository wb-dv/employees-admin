import { z } from 'zod';

import { authControllerRegisterBody } from '@shared/api';

const requiredField = 'обязательное поле';

export const newRegisterSchema = authControllerRegisterBody.extend({
  email: z
    .string({ required_error: requiredField })
    .email({ message: 'Неправильный формат email' }),
  password: z
    .string({ required_error: requiredField })
    .min(3, { message: 'Пароль должен содержать не менее 3 символов' }),
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
  dateOfBirth: '',
  jobTitleId: 0,
  departamentId: 0,
  role: 'USER',
  ...defaultData,
});
