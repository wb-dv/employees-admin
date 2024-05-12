import { ApiProperty } from '@nestjs/swagger';
import { JobTitle } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobTitleEntity implements JobTitle {
  constructor(jobTitle: JobTitle) {
    Object.assign(this, jobTitle);
  }

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ nullable: true })
  departamentId: number | null;
}
