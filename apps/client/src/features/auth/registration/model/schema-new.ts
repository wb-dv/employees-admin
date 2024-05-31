import { z } from 'zod';

import { credentialsSchema } from '@features/auth/model';

import { authControllerRegisterBody } from '@shared/api';

export const newRegisterSchema =
  authControllerRegisterBody.merge(credentialsSchema);

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
