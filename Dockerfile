FROM docker.io/node:24.19.0-alpine3.24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:1.31.6-alpine3.24
WORKDIR /app
COPY --from=builder /app/build /app
USER 101

CMD ["nginx", "-g", "daemon off;"]
