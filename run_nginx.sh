envsubst '${radix_clustername} ${radix_environment}' < ./nginx.conf.template > /etc/nginx/conf.d/default.conf
envsubst '${radix_clustername} ${radix_environment}' < /app/index.html > /app/index.html
nginx -g "daemon off;"
