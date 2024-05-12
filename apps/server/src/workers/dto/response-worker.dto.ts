import { Departament, JobTitle, Worker, Account } from '@prisma/client';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import { DepartmentEntity } from 'src/departments/entities/department.entity';

import { WorkerEntity } from '../entities/worker.entity';
import { AccountEntity } from '../entities/account.entity';
import { ValidateNested } from 'class-validator';
import { JobTitleEntity } from 'src/job-titles/entities/job-title.entity';

class JobTitleInWorker extends JobTitleEntity {
  constructor(jobTitle: JobTitleInWorker) {
    super(jobTitle);
  }

  @Exclude()
  departamentId: number;
}

class DepartmentInWorker extends DepartmentEntity {
  constructor(department: DepartmentInWorker) {
    super({ department, jobTitles: department.jobTitles });
  }

  @Exclude()
  jobTitles: JobTitleEntity[];
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
    this.department = new DepartmentInWorker({ ...departament, jobTitles: [] });
    this.account = new AccountEntity(account);
  }

  @ValidateNested()
  @Type(() => JobTitleInWorker)
  @ApiProperty({ type: () => OmitType(JobTitleInWorker, ['departamentId']) })
  jobTitle: JobTitleInWorker;

  @ValidateNested()
  @Type(() => DepartmentInWorker)
  @ApiProperty({ type: () => OmitType(DepartmentInWorker, ['jobTitles']) })
  department: DepartmentInWorker;

  @ValidateNested()
  @Type(() => AccountEntity)
  @ApiProperty({ type: () => AccountEntity })
  account: AccountEntity;

  @Exclude()
  departament?: Departament;
}
