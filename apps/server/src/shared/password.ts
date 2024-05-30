import { hashSync } from 'bcrypt';

export const hashPassword = (password: string) => {
  return hashSync(password, Number(process.env.HASHING_ROUNDS) || 10);
};
