import { Departament, JobTitle, Worker, Account } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { WorkerEntity } from '../entities/worker.entity';
import { Exclude } from 'class-transformer';
import { AccountEntity } from '../entities/account.entity';

class JobTitleInWorker implements JobTitle {
  constructor(jobTitle: JobTitleInWorker) {
    Object.assign(this, jobTitle);
  }

  id: number;

  name: string;

  @Exclude()
  departamentId: number;
}

class DepartamentInWorker implements Departament {
  constructor(departament: DepartamentInWorker) {
    Object.assign(this, departament);
  }

  id: number;

  name: string;
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
    this.departament = departament;
    this.account = new AccountEntity(account);
  }

  @ApiProperty({ type: JobTitleInWorker })
  jobTitle: JobTitleInWorker;

  @ApiProperty({ type: DepartamentInWorker })
  departament: DepartamentInWorker;

  @ApiProperty({ type: AccountEntity })
  account: AccountEntity;
}
