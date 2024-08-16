const sercices = require('./api/services.json');

/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
  schemaFile: sercices[0].swaggerSchemaUrl,
  apiFile: './src/shared/lib/redux/api.ts',
  apiImport: 'api',
  outputFile: './src/shared/lib/redux/generated-api.ts',
  exportName: 'generatedApi',
  hooks: true,
};

module.exports = config;
