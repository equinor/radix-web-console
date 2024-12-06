import type { ConfigFile } from '@rtk-query/codegen-openapi';

const RADIX_LOG_API_SWAGGER_URL =
  process.env.OVERRIDE_RADIX_LOG_API_SWAGGER_URL ||
  'https://server-radix-log-api-qa.radix.equinor.com/swagger/doc.json';

const config: ConfigFile = {
  schemaFile: RADIX_LOG_API_SWAGGER_URL,
  apiFile: './index.ts',
  apiImport: 'logStoreApi',
  outputFile: '../log-api.ts',
  exportName: 'logApi',
  hooks: true,
};

export default config;
