import { Account, Departament, JobTitle, Worker } from '@prisma/client';
import { WorkerResponseDto } from 'src/workers/dto/response-worker.dto';

export type AuthorizedResponseDtoParams = Account & {
  worker: Worker & {
    departament: Departament;
    jobTitle: JobTitle;
  };
};

export type RequestWithAuthorizedResponseDtoParams = {
  user: AuthorizedResponseDtoParams;
};

export class AuthorizedResponseDto extends WorkerResponseDto {
  constructor(account: AuthorizedResponseDtoParams) {
    super({
      worker: account.worker,
      account: account,
      departament: account.worker.departament,
      jobTitle: account.worker.jobTitle,
    });
  }
}
