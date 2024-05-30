import * as z from 'zod';

import { authControllerLoginBody } from '@shared/api';

export const loginSchema = authControllerLoginBody.extend({
  email: z
    .string({ required_error: '"email" is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({ required_error: '"password" is required' })
    .min(3, { message: 'Password must be at least 3 characters' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const defaultLoginValues: LoginSchema = {
  email: '',
  password: '',
};
