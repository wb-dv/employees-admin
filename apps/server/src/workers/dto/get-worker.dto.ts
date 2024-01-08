import { ApiProperty, PartialType } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

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

const WorkerFields = createEnum(new WorkerEntity({}));

export class GetWorkerDto extends PartialType(WorkerEntity) {
  @ApiProperty({ enum: $Enums.GroupValue, isArray: true, required: false })
  groups?: $Enums.GroupValue[];

  @ApiProperty({ enum: WorkerFields, required: false })
  orderedBy?: KeyofWorkerEntity;

  @ApiProperty({ enum: Direction, required: false })
  direction?: 'asc' | 'desc';
}
