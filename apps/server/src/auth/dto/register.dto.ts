import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateWorkerDto } from 'src/workers/dto/create-worker.dto';

export class RegisterDto extends CreateWorkerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
