envsubst '${RADIX_CLUSTERNAME} ${RADIX_ENVIRONMENT}' < /app/index.html > /app/index.html
nginx -g "daemon off;"
