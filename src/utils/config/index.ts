declare global {
  interface Window {
    injectEnv: Record<string, string> | undefined;
  }
}

export const configVariables = {
  "APP_NAME": window.injectEnv?.["APP_NAME"] ?? "Radix Web Console",
  "RADIX_CLUSTER_BASE": window.injectEnv?.["RADIX_CLUSTER_BASE"] ?? "dev.radix.equinor.com",
  "RADIX_CLUSTERNAME": window.injectEnv?.["RADIX_CLUSTERNAME"] ?? "weekly-32",
  "RADIX_CLUSTER_TYPE": window.injectEnv?.["RADIX_CLUSTER_TYPE"] ?? "development",
  "RADIX_ENVIRONMENT": window.injectEnv?.["RADIX_ENVIRONMENT"] ?? "prod",
  "CLUSTER_EGRESS_IPS": window.injectEnv?.["CLUSTER_EGRESS_IPS"] ?? "1.1.1.1,1.1.1.1",
  "CLUSTER_INGRESS_IPS": window.injectEnv?.["CLUSTER_INGRESS_IPS"] ?? "2.2.2.2,2.2.4.4",
  "OAUTH2_CLIENT_ID": window.injectEnv?.["OAUTH2_CLIENT_ID"] ?? "5687b237-eda3-4ec3-a2a1-023e85a2bd84",
  "OAUTH2_AUTHORITY": window.injectEnv?.["OAUTH2_AUTHORITY"] ?? "https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0",
  "SERVICENOW_PROXY_SCOPES": window.injectEnv?.["SERVICENOW_PROXY_SCOPES"] ?? "1b4a22f1-d4a1-4b6a-81b2-fd936daf1786/Application.Read",
  "SERVICENOW_PROXY_BASEURL": window.injectEnv?.["SERVICENOW_PROXY_BASEURL"] ?? "https://api-radix-servicenow-proxy-qa.dev.radix.equinor.com/api/v1",
  "CMDB_CI_URL": window.injectEnv?.["CMDB_CI_URL"] ?? "https://equinor.service-now.com/selfservice?id=form&table=cmdb_ci_spkg&sys_id={CIID}",
  "CLUSTER_OIDC_ISSUER_URL": window.injectEnv?.["CLUSTER_OIDC_ISSUER_URL"] ?? ""
}
