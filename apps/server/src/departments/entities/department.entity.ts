import { ApiProperty } from '@nestjs/swagger';
import { Departament } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DepartmentEntity implements Departament {
  constructor(department: Departament) {
    Object.assign(this, department);
  }

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
