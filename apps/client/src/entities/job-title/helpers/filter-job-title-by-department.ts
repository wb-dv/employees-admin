import { JobTitleEntity } from '@shared/api';

export const filterJobTitlesByDepartment = (
  jobTitles: JobTitleEntity[] | undefined,
  departmentId?: number,
) => {
  if (!jobTitles) {
    return [];
  }

  return departmentId
    ? jobTitles.filter(
        (jobTitle): jobTitle is JobTitleEntity =>
          jobTitle.departamentId === departmentId,
      )
    : jobTitles;
};
