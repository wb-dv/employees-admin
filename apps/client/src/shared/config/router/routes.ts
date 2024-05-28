export const routes = {
  index: '/',
  login: '/login',
  register: '/register',

  workers: '/workers',
  worker: '/workers/:id',
  buildWorker: (id: number) => `/workers/${id}`,

  departments: '/departments',
  department: '/departments/:id',
  buildDepartment: (id: number) => `/departments/${id}`,

  jobTitles: '/job-titles',
  jobTitle: '/job-titles/:id',
  buildJobTitle: (id: number) => `/job-titles/${id}`,

  account: '/account',
} as const;
