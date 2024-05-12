import { DepartmentDto } from './department.dto';

export class UpdateDepartmentDto extends DepartmentDto {
  constructor(department: UpdateDepartmentDto) {
    super(department);
  }
}
