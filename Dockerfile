FROM --platform=$BUILDPLATFORM docker.io/node:24.19.0-alpine3.24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

FROM docker.io/nginx/nginx-unprivileged:1.31.9-alpine3.24
WORKDIR /app
COPY --from=builder /app/build /app
USER 101

CMD ["nginx", "-g", "daemon off;"]
