FROM node:14-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run lint
RUN npm run deps
RUN CI=true npm run test
RUN npm run build

FROM nginx:1-alpine
WORKDIR /app
COPY --from=builder /app/build /app
COPY proxy/nginx.conf /etc/nginx/nginx.conf
COPY proxy/run_nginx.sh run_nginx.sh
RUN chmod +x run_nginx.sh
CMD /bin/sh -c "./run_nginx.sh"
