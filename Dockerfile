FROM docker.io/node:24.13.0-alpine3.23 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:1.29.5-alpine3.23
WORKDIR /app
COPY --from=builder /app/build /app
COPY proxy/server.conf /default.conf
COPY proxy/run_nginx.sh run_nginx.sh
COPY src/inject-env-template.js /inject-env-template.js
USER 0
RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /app \
    && chmod +x run_nginx.sh
USER 101
CMD ["/bin/sh", "-c", ". run_nginx.sh"]
