import { DepartmentEntity } from '../entities/department.entity';

export class DepartmentDto extends DepartmentEntity {
  constructor(department: DepartmentEntity) {
    super(department);
  }
}
