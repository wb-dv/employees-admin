import { ApiProperty } from '@nestjs/swagger';
import { JobTitle } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { WorkerEntity } from 'src/workers/entities/worker.entity';

import { DepartmentEntity } from '../entities/department.entity';

class JobTitleInDepartment implements JobTitle {
  constructor(jobTitle: JobTitleInDepartment) {
    Object.assign(this, jobTitle);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @Exclude()
  departamentId: number;
}

type DepartmentResponseDtoParams = {
  department: DepartmentEntity;
  workers: WorkerEntity[];
  jobTitles: JobTitleInDepartment[];
};

export class DepartmentResponseDto extends DepartmentEntity {
  constructor({ department, workers, jobTitles }: DepartmentResponseDtoParams) {
    super(department);

    this.workers = workers.map((worker) => new WorkerEntity(worker));

    this.jobTitles = jobTitles.map(
      (jobTitle) => new JobTitleInDepartment(jobTitle),
    );
  }

  @ApiProperty({ type: WorkerEntity, isArray: true })
  workers: WorkerEntity[];

  @ApiProperty({ type: JobTitleInDepartment, isArray: true })
  jobTitles: JobTitleInDepartment[];
}
