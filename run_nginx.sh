envsubst '${radix_clustername} ${radix_environment}' < /app/index.html > /app/index.html
nginx -g "daemon off;"
