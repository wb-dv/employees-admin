import * as z from 'zod';

import { accountSchema } from '@entities/account';

import { authControllerLoginBody } from '@shared/api';

export const loginSchema = authControllerLoginBody.merge(
  accountSchema.omit({
    role: true,
  }),
);

export type LoginSchema = z.infer<typeof loginSchema>;

export const defaultLoginValues: LoginSchema = {
  email: '',
  password: '',
};
