export radix_run="$(date '+%Y-%m-%dT%H:%M:%S')"
envsubst '${radix_clustername} ${radix_environment} ${radix_run}' < ./nginx.conf.template > /etc/nginx/conf.d/default.conf
envsubst '${radix_clustername} ${radix_environment} ${radix_run}' < /app/public/index.html > /app/public/index.html
nginx -g "daemon off;"
