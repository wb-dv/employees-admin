import { ApiProperty } from '@nestjs/swagger';
import { Departament } from '@prisma/client';

export class DepartmentEntity implements Departament {
  constructor(department: Departament) {
    Object.assign(this, department);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
