import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateWorkerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  patronymic: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    type: () => Date,
    description: 'Строка даты в формате ISO',
    example: '2024-05-04T21:46:37.749Z',
    required: false,
  })
  dateOfBirth?: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  jobTitleId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  departamentId: number;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  password?: string;

  @IsOptional()
  @IsEnum($Enums.Role)
  @ApiProperty({ required: false, enum: $Enums.Role })
  role?: $Enums.Role;
}
