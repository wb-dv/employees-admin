import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Departament, JobTitle } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JobTitleEntity } from 'src/job-titles/entities/job-title.entity';

type DepartmentEntityParams = {
  department: Departament;
  jobTitles: JobTitle[];
};

export class DepartmentEntity implements Departament {
  constructor({ department, jobTitles }: DepartmentEntityParams) {
    Object.assign(this, department);

    this.jobTitles = jobTitles.map((jobTitle) => new JobTitleEntity(jobTitle));
  }

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => JobTitleEntity)
  @ApiPropertyOptional({ type: () => JobTitleEntity, isArray: true })
  jobTitles?: JobTitleEntity[];
}
