import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://api-radix-servicenow-proxy-qa.radix.equinor.com/swaggerui/swagger.json',
  apiFile: './index.ts',
  apiImport: 'serviceNowStoreApi',
  outputFile: '../service-now-api.ts',
  exportName: 'serviceNowApi',
  hooks: true,
}

export default config
