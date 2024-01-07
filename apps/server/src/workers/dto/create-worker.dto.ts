import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateWorkerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: $Enums.JobValue })
  jobTitleId: $Enums.JobValue;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty({ required: false, enum: $Enums.Role })
  role?: $Enums.Role;
}
