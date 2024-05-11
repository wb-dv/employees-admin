import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Worker } from '@prisma/client';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type PartialWorker = Omit<
  PartialBy<Worker, 'dateOfBirth' | 'dateOfLayoffs' | 'image'>,
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  patronymic: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: () => Date })
  dateOfEmployed: Date;

  @IsDate()
  @ApiPropertyOptional({ type: () => Date })
  dateOfBirth?: Date;

  @IsDate()
  @ApiPropertyOptional({ type: () => Date })
  dateOfLayoffs?: Date;

  @IsUrl()
  @ApiPropertyOptional()
  image?: string;
}
