const injectEnvKey = 'injectEnv';
export const configVariables = {
  "APP_NAME": (window[injectEnvKey]["APP_NAME"] as string) ?? "Radix Web Console",
  "RADIX_CLUSTER_BASE": (window[injectEnvKey]["RADIX_CLUSTER_BASE"] as string) ?? "dev.radix.equinor.com",
  "RADIX_CLUSTERNAME": (window[injectEnvKey]["RADIX_CLUSTERNAME"] as string) ?? "weekly-32",
  "RADIX_CLUSTER_TYPE": (window[injectEnvKey]["RADIX_CLUSTER_TYPE"] as string) ?? "development",
  "RADIX_ENVIRONMENT": (window[injectEnvKey]["RADIX_ENVIRONMENT"] as string) ?? "prod",
  "CLUSTER_EGRESS_IPS": (window[injectEnvKey]["CLUSTER_EGRESS_IPS"] as string) ?? "1.1.1.1,1.1.1.1",
  "CLUSTER_INGRESS_IPS": (window[injectEnvKey]["CLUSTER_INGRESS_IPS"] as string) ?? "2.2.2.2,2.2.4.4",
  "OAUTH2_CLIENT_ID": (window[injectEnvKey]["OAUTH2_CLIENT_ID"] as string) ?? "5687b237-eda3-4ec3-a2a1-023e85a2bd84",
  "OAUTH2_AUTHORITY": (window[injectEnvKey]["OAUTH2_AUTHORITY"] as string) ?? "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0",
  "SERVICENOW_PROXY_SCOPES": (window[injectEnvKey]["SERVICENOW_PROXY_SCOPES"] as string) ?? "1b4a22f1-d4a1-4b6a-81b2-fd936daf1786/Application.Read",
  "SERVICENOW_PROXY_BASEURL": (window[injectEnvKey]["SERVICENOW_PROXY_BASEURL"] as string) ?? "https://api-radix-servicenow-proxy-qa.dev.radix.equinor.com/api/v1",
  "CMDB_CI_URL": (window[injectEnvKey]["CMDB_CI_URL"] as string) ?? "https://equinor.service-now.com/selfservice?id=form&table=cmdb_ci_spkg&sys_id={CIID}",
  "CLUSTER_OIDC_ISSUER_URL": (window[injectEnvKey]["CLUSTER_OIDC_ISSUER_URL"] as string) ?? ""
}
