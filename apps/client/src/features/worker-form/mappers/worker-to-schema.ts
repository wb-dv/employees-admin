import { WorkerResponseDto } from '@shared/api';

import { WorkerFormSchema } from '../model/worker-form-schema';

export const mapWorkerToSchema = (
  worker: WorkerResponseDto,
): WorkerFormSchema => ({
  firstname: worker.firstname,
  lastname: worker.lastname,
  patronymic: worker.patronymic,
  phone: worker.phone,
  jobTitleId: worker.jobTitle.id,
  departamentId: worker.department.id,
  email: worker.account.email,
  role: worker.account.role,
  dateOfBirth: worker.dateOfBirth,
});
