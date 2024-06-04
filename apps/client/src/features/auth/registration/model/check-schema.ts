import { z } from 'zod';

import { accountSchema } from '@entities/account';

export const checkRegistrationSchema = accountSchema.omit({
  password: true,
  role: true,
});

export type CheckRegistrationSchema = z.infer<typeof checkRegistrationSchema>;

export const getDefaultCheckRegistrationValues = (
  defaultData: Partial<CheckRegistrationSchema> = {},
): CheckRegistrationSchema => ({
  email: '',
  ...defaultData,
});
