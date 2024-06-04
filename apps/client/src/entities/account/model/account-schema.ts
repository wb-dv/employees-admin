import { z } from 'zod';

import { RoleEnum } from './types';

const requiredField = 'обязательное поле';

export const accountSchema = z.object({
  email: z
    .string({ required_error: requiredField })
    .email({ message: 'Неправильный формат email' }),
  password: z
    .string({ required_error: requiredField })
    .min(3, { message: 'Пароль должен содержать не менее 3 символов' }),
  role: z.nativeEnum(RoleEnum),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export const defaultAccountValues = {
  email: '',
  password: '',
  role: 'USER',
};
