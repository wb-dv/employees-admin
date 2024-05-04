import { $Enums, Account } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AccountEntity implements Account {
  constructor(account: Partial<AccountEntity>) {
    Object.assign(this, account);
  }

  id: number;

  email: string;

  role: $Enums.Role;

  @Exclude()
  password: string;
}
