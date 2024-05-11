import { DepartmentEntity } from '../entities/department.entity';

export class DepartmentResponseDto extends DepartmentEntity {
  constructor(department: DepartmentEntity) {
    super(department);
  }
}
