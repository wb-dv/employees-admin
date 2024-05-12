import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { JobTitleEntity } from '../entities/job-title.entity';

export class UpdateJobTitleDto extends PartialType(JobTitleEntity) {
  constructor(jobTitle: UpdateJobTitleDto) {
    super(jobTitle);
  }

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;
}
