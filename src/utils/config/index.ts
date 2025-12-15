declare global {
  interface Window {
    injectEnv: Record<string, string> | undefined
  }
}

export type ClustersType = Map<string, { href: string; baseUrl: string; isDev?: boolean; isPlayground?: boolean }>

export const configVariables = {
  APP_NAME: getVariable('APP_NAME', 'Radix Web Console'),
  RADIX_DNS_ZONE: getVariable('RADIX_DNS_ZONE', 'dev.radix.equinor.com'),
  RADIX_CLUSTERNAME: getVariable('RADIX_CLUSTERNAME', 'weekly-32'),
  RADIX_CLUSTER_TYPE: getVariable('RADIX_CLUSTER_TYPE', 'development'),
  RADIX_ENVIRONMENT: getVariable('RADIX_ENVIRONMENT', 'prod'),
  OAUTH2_CLIENT_ID: getVariable('OAUTH2_CLIENT_ID', '5687b237-eda3-4ec3-a2a1-023e85a2bd84'),
  OAUTH2_AUTHORITY: getVariable(
    'OAUTH2_AUTHORITY',
    'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0'
  ),
  RADIXAPI_SCOPES: getVariable(
    'RADIXAPI_SCOPES',
    'openid profile offline_access 6dae42f8-4368-4678-94ff-3960e28e3630/user.read email'
  ),
  SERVICENOW_PROXY_SCOPES: getVariable(
    'SERVICENOW_PROXY_SCOPES',
    '1b4a22f1-d4a1-4b6a-81b2-fd936daf1786/Application.Read'
  ),
  SERVICENOW_PROXY_BASEURL: getVariable(
    'SERVICENOW_PROXY_BASEURL',
    'https://api-radix-servicenow-proxy-qa.dev.radix.equinor.com/api/v1'
  ),
  CMDB_CI_URL: getVariable(
    'CMDB_CI_URL',
    'https://equinor.service-now.com/selfservice?id=form&table=cmdb_ci_business_app&sys_id={CIID}'
  ),
  CLUSTERS: JSON.parse(getVariable('CLUSTERS', '{}')) as ClustersType,
}

function getVariable(key: string, defaultVariable: string): string {
  const envVar = window.injectEnv?.[key]
  if (envVar === undefined || envVar.startsWith('${')) {
    return defaultVariable
  }

  return envVar
}
