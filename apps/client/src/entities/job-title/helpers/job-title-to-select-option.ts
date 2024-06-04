import { JobTitleEntity } from '@shared/api';
import { SelectOption } from '@shared/ui/select';

export const jobTitleToSelectOption = (
  jobTitle: JobTitleEntity,
): SelectOption => ({
  value: String(jobTitle.id),
  name: jobTitle.name,
});
