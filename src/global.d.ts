export {}

declare global {
  interface Window {
    CONFIG: {
      RADIX_CLUSTER_BASE: string
      RADIX_CLUSTERNAME: string
      RADIX_CLUSTER_TYPE: string
      RADIX_ENVIRONMENT: string
      CLUSTER_EGRESS_IPS: string
      CLUSTER_INGRESS_IPS: string
      OAUTH2_CLIENT_ID: string
      OAUTH2_AUTHORITY: string
      SERVICENOW_PROXY_SCOPES: string
      SERVICENOW_PROXY_BASEURL: string
      CMDB_CI_URL: string
      CLUSTER_OIDC_ISSUER_URL: string
    }
  }
}
