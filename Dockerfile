FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run lint
RUN npm run deps
RUN CI=true npm run test:no-watch
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.24-alpine
WORKDIR /app
COPY --from=builder /app/build /app
COPY proxy/server.conf /default.conf
COPY proxy/run_nginx.sh run_nginx.sh
USER 0
RUN chown -R nginx /etc/nginx/conf.d \
    && chown -R nginx /app \
    && chmod +x run_nginx.sh
USER 101
CMD /bin/sh -c ". run_nginx.sh"
