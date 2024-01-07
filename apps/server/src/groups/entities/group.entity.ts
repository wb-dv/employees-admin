import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Group } from '@prisma/client';

export class GroupEntity implements Group {
  @ApiProperty({ enum: $Enums.GroupValue })
  value: $Enums.GroupValue;

  @ApiProperty()
  label: string;
}
