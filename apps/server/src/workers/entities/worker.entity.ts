import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Worker } from '@prisma/client';

export class WorkerEntity implements Worker {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ enum: $Enums.Role })
  role: $Enums.Role;

  @ApiProperty({ enum: $Enums.JobValue })
  jobTitleId: $Enums.JobValue;
}
