# Substitute environment variables in the index.html file using the values in the current container environment
envsubst '${RADIX_CLUSTERNAME} ${RADIX_ENVIRONMENT} ${RADIX_API_ENVIRONMENT} ${RADIX_DNS_ZONE}' < /app/index.html > /app/index.html

# Start Nginx
nginx -g "daemon off;"
