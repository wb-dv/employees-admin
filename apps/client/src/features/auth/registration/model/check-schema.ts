import { z } from 'zod';

import { credentialsSchema } from '../../model';

export const checkRegistrationSchema = credentialsSchema.omit({
  password: true,
});

export type CheckRegistrationSchema = z.infer<typeof checkRegistrationSchema>;

export const getDefaultCheckRegistrationValues = (
  defaultData: Partial<CheckRegistrationSchema> = {},
): CheckRegistrationSchema => ({
  email: '',
  ...defaultData,
});
