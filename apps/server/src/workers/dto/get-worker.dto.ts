import { ApiProperty } from '@nestjs/swagger';

import { WorkerEntity } from '../entities/worker.entity';

type KeyofWorkerEntity = keyof WorkerEntity;

function createEnum<T>(obj: T): { [K in keyof T]: K } {
  return Object.keys(obj).reduce((res, key) => {
    res[key] = obj[key];
    return res;
  }, {} as any);
}

const Direction = {
  asc: 'asc',
  desc: 'desc',
};

const WorkerFields = createEnum(
  new WorkerEntity({
    accountId: 1,
    dateOfEmployed: new Date(),
    departamentId: 1,
    firstname: 'a',
    id: 1,
    jobTitleId: 1,
    lastname: 'a',
    patronymic: 'a',
    phone: 'a',
    dateOfBirth: new Date(),
    dateOfLayoffs: new Date(),
  }),
);

export class GetWorkerDto {
  @ApiProperty({ type: WorkerFields, required: false })
  search?: WorkerEntity;

  @ApiProperty({ enum: WorkerFields, required: false })
  orderedBy?: KeyofWorkerEntity;

  @ApiProperty({ enum: Direction, required: false })
  direction?: 'asc' | 'desc';
}
