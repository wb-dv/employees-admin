import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Worker } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type PartialWorker = Omit<
  PartialBy<Worker, 'dateOfBirth' | 'dateOfLayoffs' | 'image' | 'patronymic'>,
  'accountId' | 'jobTitleId' | 'departamentId'
>;

export class WorkerEntity implements PartialWorker {
  constructor(worker: PartialWorker) {
    Object.assign(this, worker);
  }

  @ApiProperty()
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: () => Date })
  dateOfEmployed: Date;

  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({ type: () => Date })
  dateOfBirth?: Date;

  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({ type: () => Date })
  dateOfLayoffs?: Date;

  @IsUrl()
  @ApiPropertyOptional()
  image?: string;
}
