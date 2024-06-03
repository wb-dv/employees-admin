import { DepartmentEntity } from '@shared/api';
import { SelectOption } from '@shared/ui/select';

export const departmentToSelectOption = (
  department: DepartmentEntity,
): SelectOption => ({
  value: String(department.id),
  name: department.name,
});
