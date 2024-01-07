import { ApiProperty } from '@nestjs/swagger';
import { $Enums, JobTitle } from '@prisma/client';

import { WorkerEntity } from 'src/workers/entities/worker.entity';
import { GroupEntity } from '../entities/group.entity';

class JobTitleInGroup implements JobTitle {
  value: $Enums.JobValue;
  label: string;
}

export class GroupResponseDto extends GroupEntity {
  @ApiProperty({ type: WorkerEntity, isArray: true })
  workers: WorkerEntity[];

  @ApiProperty({ type: JobTitleInGroup, isArray: true })
  jobTitles: JobTitleInGroup[];
}
