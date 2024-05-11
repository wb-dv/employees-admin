import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { WorkerEntity } from '../entities/worker.entity';

function createEnum<T>(obj: T): { [K in keyof T]: K } {
  return Object.keys(obj).reduce((res, key) => {
    res[key] = key;
    return res;
  }, {} as any);
}

const Direction = {
  asc: 'asc',
  desc: 'desc',
};

class SearchWorkerEntity extends OmitType(PartialType(WorkerEntity), [
  'id',
  'image',
]) {}

type KeyofWorkerEntity = keyof SearchWorkerEntity;

const WorkerFields = createEnum(
  new WorkerEntity({
    id: 1,
    firstname: 'a',
    lastname: 'a',
    patronymic: 'a',
    phone: 'a',
    dateOfEmployed: new Date(),
    dateOfBirth: new Date(),
    dateOfLayoffs: new Date(),
  }),
);

class PagingOptions {
  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;
}

export class GetWorkerDto {
  @ApiProperty({ type: () => SearchWorkerEntity, required: false })
  search?: SearchWorkerEntity;

  @ApiProperty({ type: () => PagingOptions, required: false })
  paging?: PagingOptions;

  @ApiProperty({ enum: WorkerFields, required: false })
  orderedBy?: KeyofWorkerEntity;

  @ApiProperty({ enum: Direction, required: false })
  direction?: 'asc' | 'desc';
}
