# Substitute environment variables in the index.html file using the values in the current container environment
envsubst '
  ${RADIX_API_ENVIRONMENT}
  ${RADIX_CLUSTERNAME}
  ${RADIX_CLUSTER_TYPE}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ' </app/index.html >/app/index.html

# Substitute environment variables in the nginx.conf file using the values in the current container environment
envsubst '
  ${RADIX_API_ENVIRONMENT}
  ${RADIX_CLUSTERNAME}
  ${RADIX_CLUSTER_TYPE}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ' </etc/nginx/nginx.conf >/etc/nginx/nginx.conf

# Start Nginx
echo $(date) Starting Nginx…
nginx -g "daemon off;"
