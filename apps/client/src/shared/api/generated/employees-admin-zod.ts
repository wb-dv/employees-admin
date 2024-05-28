/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Employees Admin
 * The Employees Admin API description
 * OpenAPI spec version: 0.1
 */
import { z as zod } from 'zod';

export const workersControllerCreateBody = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfBirth: zod.string().datetime(),
  jobTitleId: zod.number(),
  departamentId: zod.number(),
  email: zod.string(),
  password: zod.string(),
  role: zod.enum(['USER', 'ADMIN']).optional(),
});

export const workersControllerUpdateBody = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  patronymic: zod.string().optional(),
  phone: zod.string().optional(),
  dateOfBirth: zod.string().datetime().optional(),
  jobTitleId: zod.number().optional(),
  departamentId: zod.number().optional(),
  email: zod.string().optional(),
  password: zod.string().optional(),
  role: zod.enum(['USER', 'ADMIN']).optional(),
  id: zod.number(),
});

export const workersControllerUpdateResponse = zod.object({
  id: zod.number(),
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfEmployed: zod.string().datetime(),
  dateOfBirth: zod.string().datetime().optional(),
  dateOfLayoffs: zod.string().datetime().optional(),
  image: zod.string().optional(),
  jobTitle: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  department: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  account: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
});

export const workersControllerFindAllBody = zod.object({
  search: zod
    .object({
      firstname: zod.string().optional(),
      lastname: zod.string().optional(),
      patronymic: zod.string().optional(),
      phone: zod.string().optional(),
      dateOfEmployed: zod.string().datetime().optional(),
      dateOfBirth: zod.string().datetime().optional(),
      dateOfLayoffs: zod.string().datetime().optional(),
      departamentId: zod.number().optional(),
      jobTitleId: zod.number().optional(),
      account: zod
        .object({
          id: zod.number().optional(),
          email: zod.string().optional(),
          role: zod.enum(['USER', 'ADMIN']).optional(),
        })
        .optional(),
    })
    .optional(),
  paging: zod
    .object({
      page: zod.number(),
      size: zod.number(),
    })
    .optional(),
  orderedBy: zod
    .enum([
      'id',
      'firstname',
      'lastname',
      'patronymic',
      'phone',
      'dateOfEmployed',
      'dateOfBirth',
      'dateOfLayoffs',
    ])
    .optional(),
  direction: zod.enum(['asc', 'desc']).optional(),
});

export const workersControllerFindAllResponseItem = zod.object({
  id: zod.number(),
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfEmployed: zod.string().datetime(),
  dateOfBirth: zod.string().datetime().optional(),
  dateOfLayoffs: zod.string().datetime().optional(),
  image: zod.string().optional(),
  jobTitle: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  department: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  account: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
});
export const workersControllerFindAllResponse = zod.array(
  workersControllerFindAllResponseItem,
);

export const workersControllerFindOneParams = zod.object({
  id: zod.number(),
});

export const workersControllerFindOneResponse = zod.object({
  id: zod.number(),
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfEmployed: zod.string().datetime(),
  dateOfBirth: zod.string().datetime().optional(),
  dateOfLayoffs: zod.string().datetime().optional(),
  image: zod.string().optional(),
  jobTitle: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  department: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  account: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
});

export const workersControllerRemoveParams = zod.object({
  id: zod.number(),
});

export const workersControllerRemoveResponse = zod.object({
  id: zod.number(),
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfEmployed: zod.string().datetime(),
  dateOfBirth: zod.string().datetime().optional(),
  dateOfLayoffs: zod.string().datetime().optional(),
  image: zod.string().optional(),
  jobTitle: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  department: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  account: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
});

export const departmentsControllerFindAllResponseItem = zod.object({
  id: zod.number(),
  name: zod.string(),
  jobTitles: zod
    .array(
      zod.object({
        id: zod.number(),
        name: zod.string(),
        departamentId: zod.number().nullable(),
      }),
    )
    .optional(),
});
export const departmentsControllerFindAllResponse = zod.array(
  departmentsControllerFindAllResponseItem,
);

export const departmentsControllerCreateBody = zod.object({
  name: zod.string(),
  jobTitles: zod.array(zod.number()).optional(),
});

export const departmentsControllerUpdateBody = zod.object({
  id: zod.number(),
  name: zod.string(),
  jobTitles: zod.array(zod.number()).optional(),
});

export const departmentsControllerUpdateResponse = zod.object({
  id: zod.number(),
  name: zod.string(),
  jobTitles: zod
    .array(
      zod.object({
        id: zod.number(),
        name: zod.string(),
        departamentId: zod.number().nullable(),
      }),
    )
    .optional(),
});

export const departmentsControllerFindOneParams = zod.object({
  id: zod.number(),
});

export const departmentsControllerFindOneResponse = zod.object({
  id: zod.number(),
  name: zod.string(),
  jobTitles: zod
    .array(
      zod.object({
        id: zod.number(),
        name: zod.string(),
        departamentId: zod.number().nullable(),
      }),
    )
    .optional(),
});

export const departmentsControllerRemoveParams = zod.object({
  id: zod.number(),
});

export const departmentsControllerRemoveResponse = zod.object({
  id: zod.number(),
  name: zod.string(),
  jobTitles: zod
    .array(
      zod.object({
        id: zod.number(),
        name: zod.string(),
        departamentId: zod.number().nullable(),
      }),
    )
    .optional(),
});

export const jobTitlesControllerCreateBody = zod.object({
  name: zod.string(),
  departamentId: zod.number().nullish(),
});

export const jobTitlesControllerFindAllResponseItem = zod.object({
  id: zod.number(),
  name: zod.string(),
  departamentId: zod.number().nullable(),
});
export const jobTitlesControllerFindAllResponse = zod.array(
  jobTitlesControllerFindAllResponseItem,
);

export const jobTitlesControllerUpdateBody = zod.object({
  id: zod.number().optional(),
  name: zod.string().optional(),
  departamentId: zod.number().nullish(),
});

export const jobTitlesControllerUpdateResponse = zod.object({
  id: zod.number(),
  name: zod.string(),
  departamentId: zod.number().nullable(),
});

export const jobTitlesControllerFindOneParams = zod.object({
  id: zod.number(),
});

export const jobTitlesControllerFindOneResponse = zod.object({
  id: zod.number(),
  name: zod.string(),
  departamentId: zod.number().nullable(),
});

export const jobTitlesControllerRemoveParams = zod.object({
  id: zod.number(),
});

export const jobTitlesControllerRemoveResponse = zod.object({
  id: zod.number(),
  name: zod.string(),
  departamentId: zod.number().nullable(),
});

export const authControllerLoginBody = zod.object({
  email: zod.string(),
  password: zod.string(),
});

export const authControllerLoginResponse = zod.object({
  id: zod.number(),
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfEmployed: zod.string().datetime(),
  dateOfBirth: zod.string().datetime().optional(),
  dateOfLayoffs: zod.string().datetime().optional(),
  image: zod.string().optional(),
  jobTitle: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  department: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  account: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
});

export const authControllerAccountResponse = zod.object({
  id: zod.number(),
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfEmployed: zod.string().datetime(),
  dateOfBirth: zod.string().datetime().optional(),
  dateOfLayoffs: zod.string().datetime().optional(),
  image: zod.string().optional(),
  jobTitle: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  department: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  account: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
});

export const authControllerRegisterBody = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfBirth: zod.string().datetime(),
  jobTitleId: zod.number(),
  departamentId: zod.number(),
  email: zod.string(),
  password: zod.string(),
  role: zod.enum(['USER', 'ADMIN']).optional(),
});

export const authControllerRegisterResponse = zod.object({
  id: zod.number(),
  firstname: zod.string(),
  lastname: zod.string(),
  patronymic: zod.string(),
  phone: zod.string(),
  dateOfEmployed: zod.string().datetime(),
  dateOfBirth: zod.string().datetime().optional(),
  dateOfLayoffs: zod.string().datetime().optional(),
  image: zod.string().optional(),
  jobTitle: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  department: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
  account: zod.object({
    id: zod.number(),
    name: zod.string(),
  }),
});
