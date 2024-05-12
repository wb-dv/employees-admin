import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { DepartmentEntity } from '../entities/department.entity';
import { IsInt, IsOptional } from 'class-validator';

export class DepartmentDto extends OmitType(DepartmentEntity, ['jobTitles']) {
  @IsOptional()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: Number, isArray: true })
  jobTitles?: number[];
}
