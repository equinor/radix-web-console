#!/bin/bash
# Substitute environment variables in the index.html file using the values in the current container environment
export SERVICENOW_PROXY_BASEURL="https://api-radix-servicenow-proxy-${RADIX_ENVIRONMENT}.${RADIX_CLUSTERNAME}.${RADIX_DNS_ZONE}/api/v1"

envsubst '
  ${RADIX_CLUSTERNAME}
  ${RADIX_CLUSTER_TYPE}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ${OAUTH2_CLIENT_ID}
  ${OAUTH2_AUTHORITY}
  ${RADIXAPI_SCOPES}
  ${SERVICENOW_PROXY_SCOPES}
  ${SERVICENOW_PROXY_BASEURL}
  ${CMDB_CI_URL}
  ' </inject-env-template.js >/app/config/tmp-inject-env.js
mv /app/config/tmp-inject-env.js /app/config/inject-env.js

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
