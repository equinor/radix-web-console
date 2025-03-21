#!/bin/bash
# Substitute environment variables in the index.html file using the values in the current container environment
export SERVICENOW_PROXY_BASEURL="https://api-radix-servicenow-proxy-${RADIX_ENVIRONMENT}.${RADIX_CLUSTERNAME}.${RADIX_DNS_ZONE}/api/v1"

envsubst '
  ${RADIX_CLUSTERNAME}
  ${RADIX_CLUSTER_TYPE}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ${CLUSTER_EGRESS_IPS}
  ${CLUSTER_INGRESS_IPS}
  ${OAUTH2_CLIENT_ID}
  ${OAUTH2_AUTHORITY}
  ${SERVICENOW_PROXY_SCOPES}
  ${SERVICENOW_PROXY_BASEURL}
  ${CLUSTER_OIDC_ISSUER_URL}
  ${CMDB_CI_URL}
  ' </app/config.js >/app/tmp-config.js
mv -f /app/tmp-config.js /app/config.js

# Substitute environment variables in the nginx.conf file using the values in the current container environment
envsubst '
  ${RADIX_CLUSTERNAME}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ' </default.conf >/etc/nginx/conf.d/tmp.conf
mv /etc/nginx/conf.d/tmp.conf /etc/nginx/conf.d/default.conf

# Start Nginx
echo $(date) Starting Nginx…
nginx -g "daemon off;"
