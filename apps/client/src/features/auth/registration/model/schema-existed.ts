import { z } from 'zod';

import { accountSchema, defaultAccountValues } from '@entities/account';

import { authControllerRegisterExistedBody } from '@shared/api';

export const existedRegisterSchema = authControllerRegisterExistedBody.merge(
  accountSchema.omit({
    role: true,
  }),
);

export type ExistedRegisterSchema = z.infer<typeof existedRegisterSchema>;

export const getDefaultExistedRegisterValues = (
  defaultData: Partial<ExistedRegisterSchema> = {},
): ExistedRegisterSchema => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { role, ...defData } = defaultAccountValues;

  return {
    ...defData,
    ...defaultData,
  };
};
