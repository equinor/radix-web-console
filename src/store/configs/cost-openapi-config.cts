import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://server-radix-cost-allocation-api-qa.radix.equinor.com/swaggerui/swagger.json',
  apiFile: './index.ts',
  apiImport: 'costStoreApi',
  outputFile: '../cost-api.ts',
  exportName: 'costApi',
  hooks: true,
}

export default config
