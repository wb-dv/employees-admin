import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Worker } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class WorkerEntity implements Worker {
  constructor(worker: Partial<WorkerEntity>) {
    Object.assign(this, worker);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ enum: $Enums.Role })
  role: $Enums.Role;

  @ApiProperty({ enum: $Enums.JobValue })
  jobTitleId: $Enums.JobValue;

  @Exclude()
  password: string;
}
