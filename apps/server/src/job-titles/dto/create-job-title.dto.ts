import { IsInt, IsOptional } from 'class-validator';
import { JobTitleEntity } from '../entities/job-title.entity';
import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';

export class CreateJobTitleDto extends OmitType(JobTitleEntity, [
  'id',
  'departamentId',
]) {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({ nullable: true })
  departamentId?: number | null;
}
