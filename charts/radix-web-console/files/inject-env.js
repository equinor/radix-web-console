window.injectEnv = {
  RADIX_DNS_ZONE: {{ required "config.dnsZone is required" .Values.config.dnsZone | quote }},
  RADIX_CLUSTERNAME: {{ required "config.clusterName is required" .Values.config.clusterName | quote }},
  RADIX_CLUSTER_TYPE: {{ required "config.clusterType is required" .Values.config.clusterType | quote }},
  RADIX_ENVIRONMENT: {{ required "config.environment is required" .Values.config.environment | quote }},
  OAUTH2_CLIENT_ID: {{ required "config.oauth2.clientId is required" .Values.config.oauth2.clientId | quote }},
  OAUTH2_AUTHORITY: {{ required "config.oauth2.authority is required" .Values.config.oauth2.authority | quote }},
  OAUTH2_KNOWN_AUTHORITIES: {{ .Values.config.oauth2.knownAuthorities | quote }},
  SERVICENOW_PROXY_SCOPES: {{ required "config.serviceNowProxyScopes is required" .Values.config.serviceNowProxyScopes | quote }},
  RADIXAPI_SCOPES: {{ required "config.radixApiScopes is required" .Values.config.radixApiScopes | quote }},
  SERVICENOW_PROXY_BASEURL: {{ required "config.serviceNowProxyBaseUrl is required" .Values.config.serviceNowProxyBaseUrl | quote }},
  CMDB_CI_URL: {{ required "config.cmdbCiUrl is required" .Values.config.cmdbCiUrl | quote }},
  CLUSTERS: {{ required "config.clusters is required" .Values.config.clusters | toJson | quote }},
}
