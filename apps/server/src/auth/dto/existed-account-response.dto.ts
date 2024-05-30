import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ExistedAccountResponseDto {
  constructor(existed: boolean) {
    this.existed = existed;
  }
  @IsBoolean()
  @ApiProperty()
  existed: boolean;
}
