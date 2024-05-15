import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Account, Worker } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsInt } from 'class-validator';

export class AccountEntity implements Account {
  constructor(account: Partial<Account>) {
    Object.assign(this, account);
  }

  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsEmail()
  email: string;

  @IsEnum($Enums.Role)
  @ApiProperty({ enum: $Enums.Role })
  role: $Enums.Role;

  @Exclude()
  password: string;

  @Exclude()
  worker: Worker;
}
