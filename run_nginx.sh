envsubst '${RADIX_CLUSTERNAME} ${RADIX_ENVIRONMENT} ${RADIX_API_ENVIRONMENT}' < /app/index.html > /app/index.html
nginx -g "daemon off;"
