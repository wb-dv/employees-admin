import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Account } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AccountEntity implements Account {
  constructor(account: Partial<AccountEntity>) {
    Object.assign(this, account);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: $Enums.Role })
  role: $Enums.Role;

  @Exclude()
  password: string;
}
