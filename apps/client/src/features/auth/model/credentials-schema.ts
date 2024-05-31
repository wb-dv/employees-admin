import { z } from 'zod';

const requiredField = 'обязательное поле';

export const credentialsSchema = z.object({
  email: z
    .string({ required_error: requiredField })
    .email({ message: 'Неправильный формат email' }),
  password: z
    .string({ required_error: requiredField })
    .min(3, { message: 'Пароль должен содержать не менее 3 символов' }),
});

export type CredentialsSchema = z.infer<typeof credentialsSchema>;

export const defaultCredentialsValues: CredentialsSchema = {
  email: '',
  password: '',
};
