#!/bin/bash
# Substitute environment variables in the index.html file using the values in the current container environment
envsubst '
  ${RADIX_API_ENVIRONMENT}
  ${RADIX_CLUSTERNAME}
  ${RADIX_CLUSTER_TYPE}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ${CLUSTER_EGRESS_IPS}
  ${CLUSTER_INGRESS_IPS}
  ${OAUTH2_CLIENT_ID}
  ${OAUTH2_AUTHORITY}
  ' </app/index.html >/app/tmp.html
mv /app/tmp.html /app/index.html

# Substitute environment variables in the nginx.conf file using the values in the current container environment
envsubst '
  ${RADIX_CLUSTERNAME}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ${DYNATRACE_API_TOKEN}
  ' </default.conf >/etc/nginx/conf.d/tmp.conf
mv /etc/nginx/conf.d/tmp.conf /etc/nginx/conf.d/default.conf

# Start Nginx
echo $(date) Starting Nginx…
nginx -g "daemon off;"
