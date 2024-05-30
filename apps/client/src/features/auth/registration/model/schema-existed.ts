import { z } from 'zod';

import { authControllerRegisterExistedBody } from '@shared/api';

import { credentialsSchema, defaultCredentialsValues } from '../../model';

export const existedRegisterSchema =
  authControllerRegisterExistedBody.merge(credentialsSchema);

export type ExistedRegisterSchema = z.infer<typeof existedRegisterSchema>;

export const getDefaultExistedRegisterValues = (
  defaultData: Partial<ExistedRegisterSchema> = {},
): ExistedRegisterSchema => ({
  ...defaultCredentialsValues,
  ...defaultData,
});
