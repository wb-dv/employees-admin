const DEFAULT_MAIN_ROUTE = 'workers';

export class Routes {
  main: string;

  constructor(mainRouteKey: keyof Routes = DEFAULT_MAIN_ROUTE) {
    const dynamicMainRoute = this[mainRouteKey];
    this.main =
      typeof dynamicMainRoute === 'string'
        ? dynamicMainRoute
        : this[DEFAULT_MAIN_ROUTE];
  }

  index = '/';
  login = '/login';
  register = '/register';

  workers = '/workers';
  worker = '/workers/:id';
  buildWorker = (id: number) => `/workers/${id}`;

  departments = '/departments';
  department = '/departments/:id';
  buildDepartment = (id: number) => `/departments/${id}`;

  jobTitles = '/job-titles';
  jobTitle = '/job-titles/:id';
  buildJobTitle = (id: number) => `/job-titles/${id}`;

  account = '/account';
}

export const routes = new Routes();
