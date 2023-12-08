import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://localhost:3002/swaggerui/swagger.json',
  apiFile: './index.ts',
  apiImport: 'radixStoreApi',
  outputFile: '../radix-api.ts',
  exportName: 'radixApi',
  hooks: true,
};

export default config;
