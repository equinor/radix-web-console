import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://server-radix-vulnerability-scanner-api-qa.radix.equinor.com/swaggerui/swagger.json',
  apiFile: './index.ts',
  apiImport: 'scanStoreApi',
  outputFile: '../scan-api.ts',
  exportName: 'scanApi',
  hooks: true,
}

export default config
