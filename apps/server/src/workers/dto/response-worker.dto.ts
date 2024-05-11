import { Departament, JobTitle, Worker, Account } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { DepartmentEntity } from 'src/departments/entities/department.entity';

import { WorkerEntity } from '../entities/worker.entity';
import { AccountEntity } from '../entities/account.entity';
import { ValidateNested } from 'class-validator';

class JobTitleInWorker implements JobTitle {
  constructor(jobTitle: JobTitleInWorker) {
    Object.assign(this, jobTitle);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @Exclude()
  departamentId: number;
}

type WorkerResponseDtoParams = {
  worker: Worker;
  jobTitle: JobTitle;
  departament: Departament;
  account: Account;
};

export class WorkerResponseDto extends WorkerEntity {
  constructor({
    worker,
    jobTitle,
    departament,
    account,
  }: WorkerResponseDtoParams) {
    super(worker);
    this.jobTitle = new JobTitleInWorker(jobTitle);
    this.department = new DepartmentEntity(departament);
    this.account = new AccountEntity(account);
  }

  @ValidateNested()
  @ApiProperty({ type: () => JobTitleInWorker })
  jobTitle: JobTitleInWorker;

  @ValidateNested()
  @ApiProperty({ type: () => DepartmentEntity })
  department: DepartmentEntity;

  @ValidateNested()
  @ApiProperty({ type: () => AccountEntity })
  account: AccountEntity;

  @Exclude()
  departament?: Departament;
}
