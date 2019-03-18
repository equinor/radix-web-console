# Substitute environment variables in the index.html file using the values in the current container environment
envsubst '
  ${RADIX_API_ENVIRONMENT}
  ${RADIX_CLUSTERNAME}
  ${RADIX_CLUSTER_TYPE}
  ${RADIX_DNS_ZONE}
  ${RADIX_ENVIRONMENT}
  ${PLATFORM_USERS_GROUP}
  ' < /app/index.html > /app/index.html

# Start Nginx
nginx -g "daemon off;"
