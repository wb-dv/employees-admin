import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
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

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  patronymic?: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    type: () => Date,
    description: 'Строка даты в формате ISO',
    example: '2024-05-04',
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
