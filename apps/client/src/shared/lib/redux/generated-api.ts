import { api } from './api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    workersControllerCreate: build.mutation<
      WorkersControllerCreateApiResponse,
      WorkersControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/workers`,
        method: 'POST',
        body: queryArg.createWorkerDto,
      }),
    }),
    workersControllerUpdate: build.mutation<
      WorkersControllerUpdateApiResponse,
      WorkersControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/workers`,
        method: 'PATCH',
        body: queryArg.updateWorkerDto,
      }),
    }),
    workersControllerFindAll: build.mutation<
      WorkersControllerFindAllApiResponse,
      WorkersControllerFindAllApiArg
    >({
      query: (queryArg) => ({
        url: `/workers/read`,
        method: 'POST',
        body: queryArg.getWorkerDto,
      }),
    }),
    workersControllerFindOne: build.query<
      WorkersControllerFindOneApiResponse,
      WorkersControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/workers/${queryArg.id}` }),
    }),
    workersControllerRemove: build.mutation<
      WorkersControllerRemoveApiResponse,
      WorkersControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/workers/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    departmentsControllerFindAll: build.query<
      DepartmentsControllerFindAllApiResponse,
      DepartmentsControllerFindAllApiArg
    >({
      query: () => ({ url: `/departments` }),
    }),
    departmentsControllerCreate: build.mutation<
      DepartmentsControllerCreateApiResponse,
      DepartmentsControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/departments`,
        method: 'POST',
        body: queryArg.createDepartmentDto,
      }),
    }),
    departmentsControllerUpdate: build.mutation<
      DepartmentsControllerUpdateApiResponse,
      DepartmentsControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/departments`,
        method: 'PATCH',
        body: queryArg.updateDepartmentDto,
      }),
    }),
    departmentsControllerFindOne: build.query<
      DepartmentsControllerFindOneApiResponse,
      DepartmentsControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/departments/${queryArg.id}` }),
    }),
    departmentsControllerRemove: build.mutation<
      DepartmentsControllerRemoveApiResponse,
      DepartmentsControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/departments/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    jobTitlesControllerCreate: build.mutation<
      JobTitlesControllerCreateApiResponse,
      JobTitlesControllerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/job-titles`,
        method: 'POST',
        body: queryArg.createJobTitleDto,
      }),
    }),
    jobTitlesControllerFindAll: build.query<
      JobTitlesControllerFindAllApiResponse,
      JobTitlesControllerFindAllApiArg
    >({
      query: () => ({ url: `/job-titles` }),
    }),
    jobTitlesControllerUpdate: build.mutation<
      JobTitlesControllerUpdateApiResponse,
      JobTitlesControllerUpdateApiArg
    >({
      query: (queryArg) => ({
        url: `/job-titles`,
        method: 'PATCH',
        body: queryArg.updateJobTitleDto,
      }),
    }),
    jobTitlesControllerFindOne: build.query<
      JobTitlesControllerFindOneApiResponse,
      JobTitlesControllerFindOneApiArg
    >({
      query: (queryArg) => ({ url: `/job-titles/${queryArg.id}` }),
    }),
    jobTitlesControllerRemove: build.mutation<
      JobTitlesControllerRemoveApiResponse,
      JobTitlesControllerRemoveApiArg
    >({
      query: (queryArg) => ({
        url: `/job-titles/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: 'POST',
        body: queryArg.loginDto,
      }),
    }),
    authControllerAccount: build.query<
      AuthControllerAccountApiResponse,
      AuthControllerAccountApiArg
    >({
      query: () => ({ url: `/auth/account` }),
    }),
    authControllerLogout: build.mutation<
      AuthControllerLogoutApiResponse,
      AuthControllerLogoutApiArg
    >({
      query: () => ({ url: `/auth/logout`, method: 'POST' }),
    }),
    authControllerRegister: build.mutation<
      AuthControllerRegisterApiResponse,
      AuthControllerRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: 'POST',
        body: queryArg.registerDto,
      }),
    }),
    authControllerRegisterExisted: build.mutation<
      AuthControllerRegisterExistedApiResponse,
      AuthControllerRegisterExistedApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/register-existed`,
        method: 'POST',
        body: queryArg.registerExistedDto,
      }),
    }),
    authControllerHasAccount: build.mutation<
      AuthControllerHasAccountApiResponse,
      AuthControllerHasAccountApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/account/exists`,
        method: 'POST',
        body: queryArg.hasAccountDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type WorkersControllerCreateApiResponse =
  /** status 201  */ WorkerResponseDto;
export type WorkersControllerCreateApiArg = {
  createWorkerDto: CreateWorkerDto;
};
export type WorkersControllerUpdateApiResponse =
  /** status 200  */ WorkerResponseDto;
export type WorkersControllerUpdateApiArg = {
  updateWorkerDto: UpdateWorkerDto;
};
export type WorkersControllerFindAllApiResponse =
  /** status 200  */ WorkerResponseDto[];
export type WorkersControllerFindAllApiArg = {
  getWorkerDto: GetWorkerDto;
};
export type WorkersControllerFindOneApiResponse =
  /** status 200  */ WorkerResponseDto;
export type WorkersControllerFindOneApiArg = {
  id: number;
};
export type WorkersControllerRemoveApiResponse =
  /** status 200  */ WorkerResponseDto;
export type WorkersControllerRemoveApiArg = {
  id: number;
};
export type DepartmentsControllerFindAllApiResponse =
  /** status 200  */ DepartmentEntity[];
export type DepartmentsControllerFindAllApiArg = void;
export type DepartmentsControllerCreateApiResponse =
  /** status 201  */ DepartmentEntity;
export type DepartmentsControllerCreateApiArg = {
  createDepartmentDto: CreateDepartmentDto;
};
export type DepartmentsControllerUpdateApiResponse =
  /** status 200  */ DepartmentEntity;
export type DepartmentsControllerUpdateApiArg = {
  updateDepartmentDto: UpdateDepartmentDto;
};
export type DepartmentsControllerFindOneApiResponse =
  /** status 200  */ DepartmentEntity;
export type DepartmentsControllerFindOneApiArg = {
  id: number;
};
export type DepartmentsControllerRemoveApiResponse =
  /** status 200  */ DepartmentEntity;
export type DepartmentsControllerRemoveApiArg = {
  id: number;
};
export type JobTitlesControllerCreateApiResponse =
  /** status 201  */ JobTitleEntity;
export type JobTitlesControllerCreateApiArg = {
  createJobTitleDto: CreateJobTitleDto;
};
export type JobTitlesControllerFindAllApiResponse =
  /** status 200  */ JobTitleEntity[];
export type JobTitlesControllerFindAllApiArg = void;
export type JobTitlesControllerUpdateApiResponse =
  /** status 200  */ JobTitleEntity;
export type JobTitlesControllerUpdateApiArg = {
  updateJobTitleDto: UpdateJobTitleDto;
};
export type JobTitlesControllerFindOneApiResponse =
  /** status 200  */ JobTitleEntity;
export type JobTitlesControllerFindOneApiArg = {
  id: number;
};
export type JobTitlesControllerRemoveApiResponse =
  /** status 200  */ JobTitleEntity;
export type JobTitlesControllerRemoveApiArg = {
  id: number;
};
export type AuthControllerLoginApiResponse =
  /** status 200  */ WorkerResponseDto;
export type AuthControllerLoginApiArg = {
  loginDto: LoginDto;
};
export type AuthControllerAccountApiResponse =
  /** status 200  */ WorkerResponseDto;
export type AuthControllerAccountApiArg = void;
export type AuthControllerLogoutApiResponse =
  /** status 200 Успешный выход */ void;
export type AuthControllerLogoutApiArg = void;
export type AuthControllerRegisterApiResponse =
  /** status 200 Успешная регистрация */ void;
export type AuthControllerRegisterApiArg = {
  registerDto: RegisterDto;
};
export type AuthControllerRegisterExistedApiResponse =
  /** status 200 Успешная регистрация */ void;
export type AuthControllerRegisterExistedApiArg = {
  registerExistedDto: RegisterExistedDto;
};
export type AuthControllerHasAccountApiResponse =
  /** status 200  */ ExistedAccountResponseDto;
export type AuthControllerHasAccountApiArg = {
  hasAccountDto: HasAccountDto;
};
export type OmitTypeClass = {
  id: number;
  name: string;
};
export type AccountInWorker = {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
};
export type WorkerResponseDto = {
  id: number;
  firstname: string;
  lastname: string;
  patronymic?: string;
  phone: string;
  dateOfEmployed: string;
  dateOfBirth?: string;
  dateOfLayoffs?: string;
  image?: string;
  jobTitle: OmitTypeClass;
  department: OmitTypeClass;
  account: AccountInWorker;
};
export type ErrorDto = {
  message: string | string[];
  error: string;
  statusCode: number;
};
export type CreateWorkerDto = {
  firstname: string;
  lastname: string;
  patronymic?: string;
  phone: string;
  /** Строка даты в формате ISO */
  dateOfBirth?: string;
  jobTitleId: number;
  departamentId: number;
  email: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
};
export type UpdateWorkerDto = {
  firstname?: string;
  lastname?: string;
  patronymic?: string;
  phone?: string;
  /** Строка даты в формате ISO */
  dateOfBirth?: string;
  jobTitleId?: number;
  departamentId?: number;
  email?: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
  id: number;
};
export type AccountInSearch = {
  id?: number;
  email?: string;
  role?: 'USER' | 'ADMIN';
};
export type SearchWorkerEntity = {
  firstname?: string;
  lastname?: string;
  patronymic?: string;
  phone?: string;
  dateOfEmployed?: string;
  dateOfBirth?: string;
  dateOfLayoffs?: string;
  departamentId?: number;
  jobTitleId?: number;
  account?: AccountInSearch;
};
export type PagingOptions = {
  page: number;
  size: number;
};
export type GetWorkerDto = {
  search?: SearchWorkerEntity;
  paging?: PagingOptions;
  orderedBy?:
    | 'id'
    | 'firstname'
    | 'lastname'
    | 'patronymic'
    | 'phone'
    | 'dateOfEmployed'
    | 'dateOfBirth'
    | 'dateOfLayoffs';
  direction?: 'asc' | 'desc';
};
export type JobTitleEntity = {
  id: number;
  name: string;
  departamentId: number | null;
};
export type DepartmentEntity = {
  id: number;
  name: string;
  jobTitles?: JobTitleEntity[];
};
export type CreateDepartmentDto = {
  name: string;
  jobTitles?: number[];
};
export type UpdateDepartmentDto = {
  id: number;
  name: string;
  jobTitles?: number[];
};
export type CreateJobTitleDto = {
  name: string;
  departamentId?: number | null;
};
export type UpdateJobTitleDto = {
  id?: number;
  name?: string;
  departamentId?: number | null;
};
export type LoginDto = {
  email: string;
  password: string;
};
export type RegisterDto = {
  firstname: string;
  lastname: string;
  patronymic?: string;
  phone: string;
  /** Строка даты в формате ISO */
  dateOfBirth?: string;
  jobTitleId: number;
  departamentId: number;
  email: string;
  password?: string;
  role?: 'USER' | 'ADMIN';
};
export type RegisterExistedDto = {
  email: string;
  password: string;
};
export type ExistedAccountResponseDto = {
  existed: boolean;
};
export type HasAccountDto = {
  email: string;
};
export const {
  useWorkersControllerCreateMutation,
  useWorkersControllerUpdateMutation,
  useWorkersControllerFindAllMutation,
  useWorkersControllerFindOneQuery,
  useWorkersControllerRemoveMutation,
  useDepartmentsControllerFindAllQuery,
  useDepartmentsControllerCreateMutation,
  useDepartmentsControllerUpdateMutation,
  useDepartmentsControllerFindOneQuery,
  useDepartmentsControllerRemoveMutation,
  useJobTitlesControllerCreateMutation,
  useJobTitlesControllerFindAllQuery,
  useJobTitlesControllerUpdateMutation,
  useJobTitlesControllerFindOneQuery,
  useJobTitlesControllerRemoveMutation,
  useAuthControllerLoginMutation,
  useAuthControllerAccountQuery,
  useAuthControllerLogoutMutation,
  useAuthControllerRegisterMutation,
  useAuthControllerRegisterExistedMutation,
  useAuthControllerHasAccountMutation,
} = injectedRtkApi;
