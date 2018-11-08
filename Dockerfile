FROM node:carbon-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN CI=true npm run test && npm run build

FROM nginx:1.14-alpine
WORKDIR /app
COPY --from=builder /app/build /app
COPY nginx.conf.template nginx.conf.template
COPY run_nginx.sh run_nginx.sh
RUN chmod +x run_nginx.sh
ENV radix_clustername=clusterNameTest
ENV radix_environment=env_prod
CMD /bin/sh -c "./run_nginx.sh"
