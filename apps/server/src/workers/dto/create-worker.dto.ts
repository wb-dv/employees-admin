import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateWorkerDto {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  patronymic: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    description: 'Строка даты в формате ISO',
    example: '2024-05-04T21:46:37.749Z',
  })
  dateOfBirth?: string;

  @ApiProperty()
  jobTitleId: number;

  @ApiProperty()
  departamentId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty({ required: false, enum: $Enums.Role })
  role?: $Enums.Role;
}
