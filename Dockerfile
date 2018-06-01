FROM node:carbon-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install
VOLUME [ "/app/node_modules" ]
