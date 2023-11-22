import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile:
    'https://server-radix-api-qa.dev.radix.equinor.com/swaggerui/swagger.json',
  apiFile: '../index.ts',
  apiImport: 'radixApi',
  outputFile: '../radix-api.ts',
  exportName: 'radixApi',
  hooks: true,
};

export default config;
