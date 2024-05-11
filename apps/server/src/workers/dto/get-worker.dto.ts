import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { WorkerEntity } from '../entities/worker.entity';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AccountEntity } from '../entities/account.entity';
import { Type } from 'class-transformer';

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
]) {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  departamentId?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  jobTitleId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => PartialType(AccountEntity))
  @ApiPropertyOptional({ type: () => PartialType(AccountEntity) })
  account?: Partial<AccountEntity>;
}

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
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  size: number;
}

export class GetWorkerDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => SearchWorkerEntity)
  @ApiPropertyOptional({ type: () => SearchWorkerEntity })
  search?: SearchWorkerEntity;

  @IsOptional()
  @ValidateNested()
  @Type(() => PagingOptions)
  @ApiPropertyOptional({ type: () => PagingOptions })
  paging?: PagingOptions;

  @IsOptional()
  @IsEnum(WorkerFields)
  @ApiPropertyOptional({ enum: WorkerFields })
  orderedBy?: KeyofWorkerEntity;

  @IsOptional()
  @IsEnum(Direction)
  @ApiPropertyOptional({ enum: Direction })
  direction?: 'asc' | 'desc';
}
