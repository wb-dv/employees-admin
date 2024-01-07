import { GroupEntity } from 'src/groups/entities/group.entity';
import { $Enums, JobTitle } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { WorkerEntity } from '../entities/worker.entity';

class JobTitleInWorker implements JobTitle {
  value: $Enums.JobValue;
  label: string;
}

export class WorkerResponseDto extends WorkerEntity {
  @ApiProperty({ type: JobTitleInWorker })
  jobTitle: JobTitle;

  @ApiProperty({ type: GroupEntity, isArray: true })
  groups: GroupEntity[];
}
