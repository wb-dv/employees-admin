import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Worker } from '@prisma/client';

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
  id: number;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  patronymic: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ type: () => Date })
  dateOfEmployed: Date;

  @ApiPropertyOptional({ type: () => Date })
  dateOfBirth?: Date;

  @ApiPropertyOptional({ type: () => Date })
  dateOfLayoffs?: Date;

  @ApiPropertyOptional()
  image?: string;
}
