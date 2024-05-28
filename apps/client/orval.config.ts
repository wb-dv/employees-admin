export default {
  'employees-admin': {
    input: './src/shared/api/schema/employees-admin.json',
    output: {
      target: './src/shared/api/generated/employees-admin.ts',
      prettier: true,
      baseUrl: '/api',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/shared/api/generated/api-instance.ts',
          name: 'createApiInstance',
        },
      },
    },
  },
  'employees-admin-zod': {
    input: './src/shared/api/schema/employees-admin.json',
    output: {
      client: 'zod',
      mode: 'single',
      target: './src/shared/api/generated/employees-admin-zod.ts',
    },
  },
};
