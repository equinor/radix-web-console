import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: '../../../costApi.json',
  apiFile: '../index.ts',
  apiImport: 'costApi',
  outputFile: '../cost-api.ts',
  exportName: 'costApi',
  hooks: true,
};

export default config;
