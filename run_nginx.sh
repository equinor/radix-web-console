envsubst '${RADIX_CLUSTERNAME} ${RADIX_ENVIRONMENT} ${RADIX_API_ENVIRONMENT} ${RADIX_DNS_ZONE}' < /app/index.html > /app/index.html
nginx -g "daemon off;"
