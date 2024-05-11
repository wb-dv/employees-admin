import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkerDto } from './create-worker.dto';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  @ApiProperty()
  id: number;
}
