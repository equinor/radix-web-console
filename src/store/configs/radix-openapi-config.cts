import type { ConfigFile } from '@rtk-query/codegen-openapi'

const RADIX_API_SWAGGER_URL =
  process.env.OVERRIDE_RADIX_API_SWAGGER_URL ||
  'https://server-radix-api-qa.dev.radix.equinor.com/swaggerui/swagger.json'

const config: ConfigFile = {
  schemaFile: RADIX_API_SWAGGER_URL,
  apiFile: './index.ts',
  apiImport: 'radixStoreApi',
  outputFile: '../radix-api.ts',
  exportName: 'radixApi',
  hooks: true,
}

export default config
