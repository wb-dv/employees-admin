import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkerDto } from './create-worker.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;
}
