import * as z from 'zod';

import { credentialsSchema } from '@features/auth/model';

import { authControllerLoginBody } from '@shared/api';

export const loginSchema = authControllerLoginBody.merge(credentialsSchema);

export type LoginSchema = z.infer<typeof loginSchema>;

export const defaultLoginValues: LoginSchema = {
  email: '',
  password: '',
};
