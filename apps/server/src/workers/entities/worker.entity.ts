import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Worker } from '@prisma/client';
import { Exclude } from 'class-transformer';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type PartialWorker = PartialBy<
  Worker,
  'dateOfBirth' | 'dateOfLayoffs' | 'image'
>;

export class WorkerEntity implements PartialWorker {
  constructor(worker: Worker) {
    Object.assign(this, worker);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  patronymic: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  dateOfEmployed: Date;

  @ApiPropertyOptional()
  dateOfBirth?: Date;

  @ApiPropertyOptional()
  dateOfLayoffs?: Date;

  @ApiPropertyOptional()
  image?: string;

  @Exclude()
  accountId: number;

  @Exclude()
  jobTitleId: number;

  @Exclude()
  departamentId: number;
}
