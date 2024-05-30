import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class HasAccountDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
