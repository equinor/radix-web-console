import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile:
    'https://server-radix-log-api-qa.radix.equinor.com/swagger/doc.json',
  apiFile: './index.ts',
  apiImport: 'logApi',
  outputFile: '../log-api.ts',
  exportName: 'logApi',
  hooks: true,
};

export default config;
