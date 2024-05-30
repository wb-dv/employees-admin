import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ErrorDto {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message: string | string[];

  @ApiProperty()
  @IsString()
  error: string;

  @ApiProperty()
  @IsInt()
  statusCode: number;
}
